---
date: "2023-06-16"
title: What is DevSecOps and What Can it Do for Your Organization?
image: what-is-devsecops-and-what-can.png
categories: devsecops
tags: devsecops,devops
---

##### (image generated with stable_diffusion.openvino)

# What is DevSecOps and What Can it Do for Your Organization?

## DevSecOps = Development Security Operations

This is the practice of integrating security validation and testing at every stage of the SDLC (Software Development Life Cycle.) Rather than treating security separately or after the fact; it becomes part of the process from the start. More important than what specific DevSecOps tools you might chose, DevSecOps is cultural; security is considered by everyone and during every stage of software development.

## Why is DevSecOps a Thing now?

Rapid development with super-fast deployment and iteration has become standard practice in the past few years. In the rapid pace of modern software development, it's far too easy to let security fall by the wayside. Let's face it, security is hard and often puts barriers into productivity; all the while it has become more critical than ever with bad actors waiting to take advantage of sloppy architecture with weak security.

### DevSecOps Goals
* Catch CVEs (Common Vulnerabilities and Exposures ) early
* Enable rapid-to-market development
* Regulatory compliance (GDRP, HIPAA, PCI, etc.)
* Create a security awareness throughout the corporation and culture
* Fast, clear communication (monitoring and alerting)

<p>

# Real-life Example: Log4Shell

Remember back in 2021 when our friends at Alibaba noticed a nasty, critical issue in Log4J? This vulnerability enabled attackers to manipulate log configuration remotely and essentially send commands into the systems on which it was running -- effectively acting as a terminal "shell" on the system. While this sort of thing has occurred in the past, the Log4Shell CVE was particularly nasty since the Log4J library had been used for many years and was deeply embedded in many software systems. This was not a matter of simply "updating the app." In many cases, legacy code which hadn't been touched in years had to suddenly be updated. Also, recall that Log4Shell was a Zero-Day Vulnerability -- having been reported publicly (where hackers were already well-aware of it) but with no clear fix yet. Let's go back to DevSecOps and I'll return to this example later.

# DevOps vs DevSecOps

The purpose of DevOps is to build CI/CD (Continuous Integration and Continuous Delivery) for the purposes of delivering software faster. In practical terms, this refers to the automation of software build and validation processes. This enables developers to push their work into source control where automatic processes kick-off which build, unit-test, integration test, and ultimately deploy the software. The goal of these processes is to get as close to "real-time" as possible where developers can push many changes out to production very quickly.
<p>
The purpose of DevSecOps is much the same as DevOps, but with the big difference of having security considerations present at every stage, not just during the testing/validation stage near the end.

# DevSecOps Throughout the SDLC

## Requirements
* Assuming from the start that your systems will be attacked and working that into your planning and design
* Assume every part of the system is vulnerable and may need to be upgraded and/or replaced

## Planning / Architectural Design:
* Architect systems by breaking down into smaller, more upgradable pieces (micro-services)
* Architect an infrastructure which uses best-practices for security and adheres to the principal of least-privilege at every point

## Software Development
* Code Analysis - using automation to examine code in detail for potential security vulnerabilities, checking if code is instrumented for testing, and for complying with coding standards (formatting, style)

## Testing
* Naturally, security testing is part of testing any software system. In DevSecOps, the focus should be automating security testing and having it be a gating part of the process

## Deployment
* Monitoring and alerting should be automatically be deployed with any system headed to production
* Monitoring and alerting automatically hook themselves into the companies communication channels (i.e.: PagerDuty, Slack notifications, emails, etc.)

## Support / LiveOps
* Ability to roll-out security patches or software updates quickly
* Ability to roll-back insecure changes
* Gives team ability to react quickly for any security issues the process hasn't caught

## DevSecOps in a Nutshell
* Having automated, repeatable processes and taking humans out as a factor
* Having automated security checks at every level of the development process
* Having security checks be gating - if they fail, the process stops until they are addressed
* Being proactive is of course better, but being able to roll-back or update software in which new CVEs are reported will help you react quickly, before damage is done
* Monitoring and alerting
* Communication - while encouraging good communication between colleagues is always beneficial, DevSecOps does not wait for people to talk to each other. Commutation channels are alerted via monitoring, which is setup with automation - so it's always part of the process and the right people are always informed when they need to be
* Security team - if you're fortunately enough to have dedicated, security professionals in your organization then take full advantage of them by working them into your process at every stage; from getting their advice during the conceptual phase, to recommending architectural approaches during design, to attacking the production system to search for vulnerabilities in what you've deployed


# DevSecOps Tools
Your choice of tools should be based on many factors and those factors will be given different weights depending on the company and situation. If the choice of any one tool isn't obvious, then make a grid with these factors and fill them in. You can also take a vote on your team to see what the feeling is toward one tool or another. Chances are that somebody has experience with that tool and may have some insight. Some of the factors you tend to consider are:<p>
* How familiar is the team with the choice of tool?
* Is the learning curve worth the benefits the tool brings?
* How much community support does the tool have?
* By using this tool, how much on-going maintenance will the team incur? (i.e.: the team has to maintain the tool vs. SaaS)
* Is the tool native or agnostic? (i.e.: if you're an Azure shop or an AWS shop, does the tool have additional benefits in that cloud? Or should you consider non-native, agnostic tools which work for all environments, but may not be as optimized)
* How much does the tool cost?

# DevSecOps Example With Real-Life Tools

<img src="assets/images/devsecops.png" width="70%">
<p>

# Ok, Back to Log4Shell

So, how could all this have helped during the Log4Shell CVE? Here's an idea of how DevSecOps could have helped at each stage of the SDLC:
* Requirements:
    * At this point we may make the decision to avoid Log4J entirely and go with LogBack or some other logging solution
    * At the very least, have in place a plan to enable fast updates of all system components in the event of a CVE
* Planning / Architectural Design
    * Log4Shell was bad but has a weakness - it requires the vulnerable component to be internet accessible. If hackers can't even access the component in question in the first place, then all the better!
    * Implement least-access, least-privileges
* Software Development
    * Log4Shell's CVE required use of specific features and configurations. These are the sorts of vulnerabilities which automated security checks can detect and provide feedback to the developer
* Testing
    * Can the system be hacked as described by the CVE? Create automated tests for this and other similar scenarios
* Deployment
    * A security team would surely be aware of this CVE and could test your production environment to ensure update compliance
    * Automation can somewhat make up for the lack of a human security team by using attack simulators
* Support / LiveOps
    * No need to panic when our components are easily updated via automation
    * Wether we're talking about back-end server software or mobile clients - have the automation in place to rapidly update whenever possible

<p>

# About Me
I have decades of experience in software development and have been part of the DevOps movement since the beginning. My years as a developer and QA engineer gave me a penchant for the automation which DevOps promises. Having repeatable, reliable CI/CD processes is not only critical for fast, high-quality deliverables - it also satisfies like nothing else ;-)