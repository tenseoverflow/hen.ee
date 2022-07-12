---
title: How to Host a Searx Instance
layout: post
description: This is a guide on setting up your own Searx instance with Filtron reverse proxy and Morty result proxy. Searx is an open-source privacy-respecting metasearch engine.
summary: This is a guide on how to set up a Searx instance on your server.
tags:   2021 technology guide self-hosted
minute: 15
image: /images/searx1.png
---

<a href="/images/searx1.png"><img src="/images/searx1.png" alt="Picture of Searx's homepage" /></a>

This is a guide on hosting your own Searx instance with Filtron reverse proxy and Morty result proxy.

# What is Searx?

Searx is a privacy-respecting meta-search engine. It is not a regular search engine like Brave Search, Bing or Google which indexes information from pages by using their bots. A meta-search engine asks other search engines for results and presents them to you. It is also free, open-source and hackable.

It can also act as a proxy for these search engines as your server is doing the requests to Google not your machine which is more private while still having Google's results. One downside can be the speed due to it having to pull information from another server; some engines might be slower than others and that is shown on Searx's settings.

You can find a public instance to test it <a href="https://searx.space">here</a> or use my <a href="https://searx.hen.ee">instance</a>.

<a href="/images/searx2.png"><img src="/images/searx2.png" alt="Picture of Searx's results" /></a>

## What is all this Filtron or Morty stuff?

Filtron is an application firewall, a middleware between Searx and Nginx (webserver). It avoids abuse from your server and limits requests. Essentially it protects your server from bad people or bots.

Morty is a result proxy which proxies images and websites. It downloads images and displays them from your server like Searx does to search queries. You can also view websites through your server privately without using your machine to request that website, *almost like a VPN cough.*

# First things first

This guide uses Ubuntu/Debian but can be used on CentOS as well with minimal changes. This guide has been tested on `aarch64` and `amd64` architectures both on Ubuntu 20.04. Change **`example.com`** to your domain.

First we will make a subdomain. This is different from all registrars but make a CNAME record (or A record if you have your IP address) for your domain like so: (Some will like the dot at the end, some will not)

<pre><code>searx   1800 IN CNAME   <strong>example.com</strong>.</code></pre>

<pre><code>searx   1800 IN A   <strong>127.0.0.1</strong> (change the IP)</code></pre>

Cloudflare's DNS for example:

<a href="/images/DNS-cloudflare-searx.png"><img src="/images/DNS-cloudflare-searx.png" alt="Picture of Cloudflare's DNS settings"/></a>

## Setting up Environment

When you have done that, we will update the system. You will need Nginx and Git for this, these commands will install it for you. You should have sudo privileges and be a user other than `root`; it is preferred that way due to permission errors you might encounter while being `root`.

<pre><code>$ sudo apt update
$ sudo apt upgrade
$ sudo apt install git nginx</code></pre>

## Installing Searx

We will clone the Searx repository. Do this in your home directory.

<pre><code>$ git clone https://github.com/searx/searx searx
$ cd ./searx
</code></pre>

Now we will use the install script to install Searx, Filtron and Morty. Some questions will come up, press enter to all of them.

<pre><code>$ sudo -H ./utils/searx.sh install all
$ sudo -H ./utils/filtron.sh install all
$ sudo -H ./utils/morty.sh install all</code></pre>

Check if all services are running.

<pre><code>$ sudo systemctl status searx
$ sudo systemctl status filtron
$ sudo systemctl status morty</code></pre>

If everything is installed and all services are running, we can set up Nginx.

## Nginx Config

Make sure Nginx is running (if it's not running you can check for errors using the command <code>nginx -t</code>).

<pre><code>$ sudo systemctl status nginx</code></pre>

Make a config file for Searx <code>/etc/nginx/sites-available/searx.conf</code> and edit it with your favourite text editor for example nano:

<pre><code>$ sudo nano /etc/nginx/sites-available/searx.conf</code></pre>

Paste the following content in there and replace <code>example.com</code> with your domain name.

<pre><code>server {

        # Listens on http
        listen 80;
        listen [::]:80;

        # Your server name
        server_name searx.<strong>example.com</strong>;

        root /usr/local/searx/searx-src;

        # If you want to log user activity, comment these
        access_log /dev/null;
        error_log  /dev/null;                

        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Permissions-Policy "interest-cohort=();geolocation=();midi=();notifications=();push=();sync-xhr=();microphone=();camera=();magnetometer=();gyroscope=();speaker=();vibrate=();fullscreen=();payment=();";
        add_header 'Referrer-Policy' 'same-origin';
        add_header Expect-CT 'enforce; max-age=3600';
        
        # SSL settings for security (DO NOTE: This disables TLS 1.0 and TLS 1.1
        # + some ciphers, if you have any older browsers and hardware
        # [https://oktasupport.cadence.com/TLS1.2_BrowserSupport.html], it may
        # not work on them)
        ssl_protocols TLSv1.2 TLSv1.3;

        # certbot might have a hard time automatically installing the certificates if these are enabled. You can enable these later if you'd like.

        #ssl_prefer_server_ciphers on;
        #ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
        #ssl_session_timeout  1d;
        #ssl_session_cache shared:SSL:10m;
        #ssl_session_tickets off; # Requires nginx >= 1.5.9
        #ssl_stapling on; # Requires nginx >= 1.3.7
        #ssl_stapling_verify on; # Requires nginx => 1.3.7


        index index.html index.htm;

        # Searx reverse proxy
        location / {
                proxy_pass         http://127.0.0.1:4004/;
        
                proxy_set_header   Host             $http_host;
                proxy_set_header   Connection       $http_connection;
                proxy_set_header   X-Real-IP        $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_set_header   X-Scheme         $scheme;
                proxy_set_header   X-Script-Name    /searx;
        }

        location /searx/static {
                alias /usr/local/searx/searx-src/searx/static;
        }

        # Morty reverse proxy
        location /morty {
                proxy_pass         http://127.0.0.1:3001/;
        
                proxy_set_header   Host             $http_host;
                proxy_set_header   Connection       $http_connection;
                proxy_set_header   X-Real-IP        $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_set_header   X-Scheme         $scheme;
        }
}</code></pre>

Create a symbolic link between <code>/etc/nginx/sites-available/searx.conf</code> and <code>/etc/nginx/sites-enabled/searx.conf</code>

<pre><code>$ sudo ln -s /etc/nginx/sites-available/searx.conf /etc/nginx/sites-enabled/searx.conf</code></pre>

Also create an HTTPS certificate using either `certbot` or use your SSL certificate. Learn more about <a href="https://landchad.net/certbot.html">creating a certificate with Certbot</a>.

If you have done that you can now restart Nginx and Uwsgi.

<pre><code>$ sudo -H systemctl restart nginx
$ sudo -H service uwsgi restart searx</code></pre>

Go visit your <code>searx.<strong>example.com</strong></code> and see if it works! You should see the <a href="/images/searx1.png">Searx logo and search bar</a>.

## Changing settings

If you want to change some settings of your Searx instance go edit <code>/etc/searx/settings.yml</code>. Use <a href="https://searx.github.io/searx/admin/settings.html">this guide</a> for more information.

<pre><code>$ sudo nano /etc/searx/settings.yml

<strong>### After editing do:</strong>

$ sudo -H service uwsgi restart searx</code></pre>

## Maintaining Searx

To update Searx you can use the following commands:

<pre><code>$ cd /usr/local/src/searx
$ sudo -H ./utils/searx.sh update searx
$ sudo -H ./utils/filtron.sh update filtron
$ sudo -H ./utils/morty.sh update morty</code></pre>
                                    
## Uninstalling Searx

To uninstall, execute these commands:

<pre><code>$ cd /usr/local/src/searx
$ sudo -H ./utils/searx.sh remove all
$ sudo -H ./utils/filtron.sh remove all
$ sudo -H ./utils/morty.sh remove all</code></pre>

## Need help?

Check out <a href="https://github.com/searx/searx/issues?q=is%3Aissue">Searx's Github issues</a> and <a href="https://github.com/searx/searx/discussions/categories/installation-issue-official-wiki">discussions page</a>. Also check <code>nginx -t</code> for any errors with Nginx.

If you have any issues or questions you can contact me via [my e-mail](mailto:contact@hen.ee).

Congratulations on setting up Searx and thanks for reading. <a href="/instances#donate">Support me by donating</a> if it helped you.