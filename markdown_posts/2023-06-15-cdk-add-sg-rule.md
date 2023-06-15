---
date: "2023-06-15"
title: How to use CDK to add a rule to an existing security group
image: city1.png
categories: Git
tags: git, devops
---
##### (image generated with stable_diffusion.openvino)

# Prerequisite steps (or you can just jump to the code example below)
* Clone the git repository here: https://github.com/rancortooth/simple-cdk
* Install node dependencies
```bash
cd simple-cdk
npm install
```
* If you haven't already, make sure your AWS account/region has been bootstrapped for CDK
```bash
# For example:
cdk bootstrap aws://234167234234/us-east-2
```
* List the example deployments
```bash
cdk ls
```
<p>

# bin/simple-cdk.ts
```typescript
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SimpleCdkStackAddSecurityGroupRule } from '../lib/simple-cdk-stack-add-security-group-rule';

const app = new cdk.App();

//
// NOTE: Change "account" and "region" to match your AWS setup
//
//   env: { account: '123456789012', region: 'us-east-1' }
//

new SimpleCdkStackAddSecurityGroupRule(app, 'SimpleCdkStackAddSecurityGroupRule', {

  env: { account: '123456789012', region: 'us-east-1' },

});

```
<p>

# lib/simple-cdk-stack-add-security-group-rule.ts
```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class SimpleCdkStackAddSecurityGroupRule extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //
    // Add an inbound rule to securityGroupB which allows
    // allows securityGroupA to access port 22
    //
    const securityGroupA = ec2.SecurityGroup.fromSecurityGroupId(this, "security-group-A", 'sg-091bbd3cbfb6643c9');

    const securityGroupB = ec2.SecurityGroup.fromSecurityGroupId(this, "security-group-B", 'sg-094283b4eb5b6529d');

    // Allow all TCP traffic from "allowThisSecurityGroup" to "securityGroup"
    securityGroupB.addIngressRule(securityGroupA, ec2.Port.allTcp());

  }
}

```