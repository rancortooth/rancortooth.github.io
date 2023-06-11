---
date: "2023-06-11"
title: Retrieving AWS Secret in One Bash Line
image: computers.png
categories: Devops
tags: devops, aws, secrets
---
##### (image generated with stable_diffusion.openvino)

# How to retrieve an AWS secret in one line of bash

I've encountered the need to retrieve secrets from AWS's secretsmanager while working in Bash. Ideally, I need just the value of the secret; clean, no json, no quotes, etc.

## jq is your friend
"jq" is a powerful, command-line json parser and is endlessly handy when working with the AWS CLI. Using jq can be an art all its own, but for the sake of these examples, I wanted to call-out the "-r" option. "-r", or "raw" output, will give you the pure values, with no quotes.

<a href="https://jqlang.github.io/jq/" target="_blank">https://jqlang.github.io/jq/</a>

## Examples 
```bash

#
# For a secret with a simple string type value
#
export MY_SECRET=$(aws --region us-west-2 secretsmanager get-secret-value --secret-id "smsd/my_secret" | jq -r .SecretString)
echo $MY_SECRET

#
# For a secret with json {name:value} values where you want just one of those values
#  "secret_name" is the name of the name/value pair you want contained in the secret
#  { "secret_name": "secret_value" }
#
export MY_SECRET=$(aws --region us-west-2 secretsmanager get-secret-value --secret-id "smsd/my_secret" | jq -r .SecretString | jq -r .secret_name)
echo $MY_SECRET

```
