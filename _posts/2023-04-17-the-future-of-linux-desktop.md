---
title: "The Future of Linux Desktop: Containers"
layout: post
description: Fedora Silverblue is changing. A reliable, immutable and flexible Linux distro. Cloud native desktop model is here.
summary: New changes related to Fedora Silverblue. Cloud Native Desktop.
tags: 2023 technology
minute: 3
---

Fedora Silverblue is changing. The age of image-based cloud desktop is here. Bow to your new DaaC (desktop as a container) overlords. This is [(soon-to-be) Fedora 39's](https://fedoraproject.org/wiki/Changes/OstreeNativeContainerStable) new approach to Ostree, the cloud native Linux desktop model.

Jokes aside, I find this approach fascinating and definitely welcoming in the immutable Linux distro trend. This is pretty much the end of the current distribution of Linux distros. Any distro developer would just make a recipe based on another Linux distro. Any of your configurations would be easily saved to a Dockerfile, pretty much a backup of your custom system available at all times.

This is also great for opinionated scripts to setup environments, such as [Ublue](https://ublue.it/). When I saw this, I was definitely sold on the idea. 

**But what is cloud native Linux desktop model?** Basically, now Fedora allows you to base your operating system content on an OCI image, pretty much a Docker image. Coupled with immutability (system directories are read-only), this will make for a very reliable system.

Immutability comes with its challenges still. The default Linux Distro paradigm doesn't fit here, the system doesn't cater to hardcore debloat power-users. Stability requires compromises. While you could make your own debloated OCI image based on a distro, changing it isn't as easy as it seems.

For a regular user, this idea works well. Great stability + rollback features, who wouldn't want that? But this idea unfortunately only works for a subset of developers. Personally, I'm not ready to use an immutable distro as the end-all distro (even though I'm using one right now). Immutability poses some minor challenges to my workflow, not to mention distro quirks. Will OCI images replace that? We'll see soon.

Thanks to Jorge Castro for the idea. Here's his video about [Fedora Silverblue moving to bootable OCI images](https://www.youtube.com/watch?v=X8h304Jp9N8).
