---
title: "Don't Trust Oracle Cloud Free tier"
layout: post
description: A week ago I went on a trip and suddenly found out that none of my self-hosted services that are hosted on Oracle Cloud work. Turns out, Oracle Cloud deleted my account with no warning.
summary: A warning to all trying out Oracle Cloud Free Tier.
tags: 2023 technology cloud
minute: 3
---

This is a warning to all sysadmins and developers trying out Oracle Cloud's free tier.

A week ago I went on a trip and suddenly found out that none of my self-hosted services that are hosted on Oracle Cloud work. Since I had AdGuardHome DNS hosted there, I couldn't use the internet until I figured out it was a DNS issue. And since I had my mailserver hosted there, I had no information whatsoever about my servers' status.

After returning home, I found out my Oracle Cloud tenancy got deleted. Poof, just gone. Disappeared. Worst part: without a warning, not even in advance. With no way to contact support or inquire more information.

To give context, I had been using Oracle Cloud's free tier for more than a year. I had no issues except for sometimes servers turning off. But I was notified about it timely. 

This was absolutely unprecedented. Yet a part of me expected this. Some things aren't and can't be free forever. Or usually comes with a catch. This time, it was lack of support (you have to pay for support) and care for their customers. Which is fine when it's a free product they're generously giving away, I'm not cross about that. Just that, wouldn't you like there to be better communication when deciding to randomly delete an account?

Why give so much compute resources away in the first place? Is it to garner more customers or have a free trial exist forever? Hobbyists aren't very enticed by the price of Oracle Cloud, the free tier already gives you so much. For companies, the trial month already gives you a great overview of what it can do. Maybe it's just shady marketing to win the cloud race.

So if you're a hobbyist sysadmin or developer, remember that nothing free lasts forever. And don't use it to structure your digital life like I did. Oracle surprisingly has the [most invasive data mining practices](https://techcrunch.com/2022/08/22/oracle-us-privacy-class-action/). [Others have also had issues](https://scribe.rip/oracle-free-tier-is-not-free-36b3c12375a2) related to Oracle Cloud support.