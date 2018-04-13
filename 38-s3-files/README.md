# server
the server folder contains the nodejs server, run it before starting the app!

# app

This folder contains the react application.

run with:
`npm start
`

You need AWS credentials in ~/.aws/credentials, this app uses the "labapp"
credential, so your file needs this section:
`
[labapp]
aws_access_key_id = abcdefg
aws_secret_access_key = 12345678
`

The bUCKET POLICY IS

{
    "Version": "2012-10-17",
    "Id": "Policy1523472141748",
    "Statement": [
        {
            "Sid": "Stmt1523472127266",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::208736948127:user/labapp_user"
            },
            "Action": [
                "s3:GetBucketLocation",
                "s3:GetObject",
                "s3:Get*",
                "s3:ListBucket",
                "s3:ListBucketVersions",
                "s3:Put*"
            ],
            "Resource": [
                "arn:aws:s3:::labapp-uploads",
                "arn:aws:s3:::labapp-uploads/*"
            ]
        }
    ]
}
