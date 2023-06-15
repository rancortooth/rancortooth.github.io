---
date: "2023-06-15"
title: How to set git credentials for different repositories when using https
image: chrome-wheel.png
categories: Git
tags: git, devops
---
##### (image generated with stable_diffusion.openvino)

# How to set git credentials for different repositories when using https

```bash
# Instruct git to use the credential.helper store and
# to store credentials for different repositories
git config --global credential.helper store
git config --global credential.https://github.com.useHttpPath true

# Get your remote URL
git config --get remote.origin.url

# Configure your credentials
git config credential.<REMOTE_URL>.username <YOUR_USER_NAME>
```
<p>
While pushing changes, you'll be prompted for your password once and git will store them on disk.

<img src="assets/images/warning.png" width="30px">
## Warnings
* Using **credential.helper** will store your credentials in PLAIN TEXT in **~/.git-credentials** by default
* Do not use this on a shared machine/login account
<p>