---
title: Host Your Website and Mail for Free Using Oracle Cloud
layout: post
description: Start hosting your own private and secure webserver and mailserver to become more digital independent from big corporations using Oracle Cloud's free tier.
summary: Start hosting your own website and mailserver for free now!
tags: 2021 technology guide self-hosted
minute: 8
---

> You need a website right now.

Like really.

It's great for your personal brand, even if you don't have one. A custom website and mail will make you look professional on the internet. It will make you independent of many of the big corporations that make mistakes like [locking you out of your account randomly](https://www.businessinsider.com/google-users-locked-out-after-years-2020-10). And it helps make the web a more decentralized place as Tim Berners-Lee always wanted.

Do note, managing servers may require a bit of time, practice and patience and doesn't always guarantee 100% uptime or stability. You are really on your own managing these servers. But once everything works you really don't have to worry, and you'll forget about it after some time.

Today, it's very easy to set up an independent public website or secure e-mail server. This guide will take only a couple of minutes and doesn't require any prior knowledge about the console or IT, however would be very helpful to get over CLI-shyness.

I'll try to be as straight-forward as possible in this guide, however if you do ever feel lost, don't worry to search or ask about it on the internet. You can also [contact me](mailto:contact@hen.ee) if you experience any problems.

# Creating an Oracle Cloud account

Get started by going to [Oracle's sign-up page](https://signup.cloud.oracle.com/) and filling out the details. You will unfortunately need to verify your account using a debit/credit card, however this is done only via PayPal's own payment system. It will come with a 1-month free trial, however we will only use the Always-Free services. *(I know their interface is horrible.)*

Once you've got your account ready and provisioned, you can now create our servers. The Always-Free tier provides with two small-scale servers perfect for hosting a website or e-mail server. It's a "cloud compute" server with an AMD CPU, 1GB of memory and ~50GB storage (+ can be expanded via block storage). Seems like the [Oracle guys are desperate](https://www.businessinsider.com/oracle-cloud-infrastructure-insiders-culture-of-fear-2021-6) for more customers.

We will use one for hosting our website and the other one as our e-mail server.

## Provisioning two servers.

