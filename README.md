# hss-notes-store-test-data
test data uploader/generator for notes app

## Setup
### Requirements
`export AWS_DEFAULT_PROFILE='my-mfa-profile'`
- [] aws cli install
- [] .aws config file
- [] AWS account access to another account thru assumedRole MFA
- [] nvm install
- [] global yarn install

AWS sdk for javascript doesn't provide the same support for assumedRoles with MFAs
as Go sdk.

## Running the App
In the command prompt, use the aws cli to trigger the MFA prompt:
`aws ec2 describe-instances`
