echo "Building Client"
cd client
npm i
npm run build
cp -r dist/* ../server/build/

echo "Installing Server Dependencies"
cd ../server
npm i