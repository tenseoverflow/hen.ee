---
title: "Reworking my NAS (Fedora Server Edition)"
layout: post
description: I had enough of Open Media Vault. So I decided to give Fedora Server a go. So far it's going OK.
summary: Reworking my NAS' software and structure.
tags: 2023 technology guide self-hosted
minute: 5
---

I had enough of Open Media Vault. So I decided to give Fedora Server a go. So far it's going OK.

The reason I didn't stay with OMV was due to the half-botched software it was running. Upgrading meant that the dashboard didn't work. PHP needed configuration. Et cetera. Didn't even use the dashboard at the end. However, I can't say it was all bad. It had good defaults and fast setup. ZFS (a 3rd-party plugin) worked great out of the box. It was a breeze to set up.

Now, my friendship has ended with OMV. But what to choose next? TrueNAS seemed like the first option, but I'm not ready for BSD yet. Then I watched [Wolfgang's video about his NAS setup](https://www.youtube.com/watch?v=f5jNJDaztqk). I was convinced trying his method. But I went with Fedora Server rather than Ubuntu. The reason for this choice was... probably because why not.

Before you argue that it's going to end badly due to it not being a stable distro, I understand that I'm dealing with a bleeding edge distribution. The kernel will be the latest, software too. But I'm okay with that. It's my personal NAS.

What makes this distribution powerful for me, is its software stack. Podman is a great alternative to Docker, and I'm already hooked on its rootless possibilities. Almost all the services I run are rootless under podman. Using SystemD to manage and update is also fantastic but requires some time setting up.

As for the dashboard, Cockpit gets the job done and I use it basically every time I manage my server. It's interesting how well it works on RHEL-based distribution – well, given it's a RHEL project, of course it should. I had difficulties with it on Debian distributions (probably due to old packages) but it was miles better than the OMV dashboard. I still wish Cockpit had some more features like Samba and ZFS management. Currently they're quite old 3rd-party plugins, that seem to be not developed any more.

SELinux is great to manage on Cockpit, but due to some problems with ZFS I'm currently not using it on enforce mode. And that brings me to the issues with ZFS. Since Fedora runs the latest kernels, ZFS updates can't catch up with the latest kernels. I have to make sure DNF doesn't update the kernel to a version that might be unsupported by ZFS. Looking back, I wish I went the route Synology went and did a mdadm/btrfs type stack, but ZFS has some great data integrity features, so I don't regret anything yet.

I've decided to publicize my server configuration on [Github](https://github.com/tenseoverflow/infrastructure) if anyone is interested. These compose and SystemD service files may not work on all machines. But I would love your feedback, what opinions you have about running a bleeding edge distribution on a server? [E-mail me](mailto:contact@hen.ee) and let's start a discussion.