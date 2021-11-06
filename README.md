# circleci-challenge

## The Project

This is a simple utility library implemented to fulfill the requirements of having a project with:

- at least two tests
- at least one dependency
- at least one file is being generated

This project's CircleCI pipeline can be found [here](https://app.circleci.com/pipelines/github/EricRibeiro/circleci-challenge).

## The Pipeline

After many iterations, the final pipeline ended up with four workflows: checkout, build, test and deploy. I am unsure if this is the right call because every sequential workflow adds an overhead of spinning up and preparing the environment. That said, I still went with four because I felt like it brings more visibility to where a potential issue lies at the cost of ~10 seconds in total.

### Checkout

At some point, I found myself checking out the repo and handling cache in more than one workflow. To respect the DRY principle, I extracted all that to its own workflow and used workspace persistence and attachment to move the data around. I am sure the [node orb](https://circleci.com/developer/orbs/orb/circleci/node) abstracts some of that complexity (if not all), but part of the challenge is to show that I know what I'm doing - that means no shortcuts.

### Build

Not a lot is happening here. This is its own workflow because "test" uses two containers - meaning, the project would be built and persisted to the workspace twice. And if the project doesn't build, that's a red flag that need to be taken care of before proceeding with the other jobs.

### Test

I really really liked the parallel test feature. The challenging part was to get mocha to generate an xml file that could be used to split tests via timing. Luckily there is a [npm package](https://www.npmjs.com/package/mocha-junit-reporter) that handles that and a [issue](https://github.com/michaelleeallen/mocha-junit-reporter/issues/132#issuecomment-864212687) explaining how to massage the file to get it working with CircleCI. The troublesome bit is to look at artifacts from different containers, but this can be mitigated with a post-processor that unifies them.

### Deploy

This last workflow wasn't a requirement per se, but it was included so I could use conditionals in a context that made sense in real life. After everything is said and done, I use a token saved in my environment variables to publish this library to npm. But this workflow only executes if the "main" branch triggered the job. This behaviour, in itself, is not the conditional specified in the requirements - I just used a filter for that. The actual conditional is in the "build" workflow. The job will only persist the built package to the workspace if it is the "main" branch - as the built library is needed for the deployment. Otherwise, there is no need to persist since the tests run without the built files.

The pipeline with deploy can be found [here](https://app.circleci.com/pipelines/github/EricRibeiro/circleci-challenge/35/workflows/68bae6ab-92dd-4cc5-aaa8-0985e3ffe152) and without it, [here](https://app.circleci.com/pipelines/github/EricRibeiro/circleci-challenge/34/workflows/951196e8-bda7-4aa9-8455-88fab16b622c).

## Artifacts

As to artifacts, I am saving the coverage report in the "test" workflow, and the published package in the "deploy" workflow.

## Final Notes

I have used Azure Pipelines, CodePipeline, GitHub Actions and Jenkins - I don't believe any of them was so intuitive and easy to troubleshoot as CircleCI. The SSH rerun functionality that leverages GitHub's SSH credentials makes it super easy to find out what is going on. The docs are very comprehensive and it's easy to find practical examples in CircleCI's GitHub and blog posts.

Pretty cool tool, 10/10 😊!