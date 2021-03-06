#!/bin/bash

set -euxo pipefail

curl -sL https://sentry.io/get-cli/ | bash || true

export SENTRY_ORG=your-sentry-org

export VERSION=$(echo $GITHUB_REF | grep -oh 'release-.*')

if [ -z "$VERSION" ]; then
  echo "$GITHUB_REF is not a valid release tag"
  exit 1
fi

sentry-cli releases new -p spoke $VERSION
sentry-cli releases set-commits --auto $VERSION
