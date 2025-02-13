
BASEDIR=$(dirname "$0")
pnpm migrate:deploy && node $BASEDIR/../dist/src/index.js