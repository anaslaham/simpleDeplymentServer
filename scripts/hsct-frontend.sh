cd /
cd home/itland/server/stemCells/frontend/hsct-frontend/
git pull origin dev
npm i
npm run build
cp -f -r  build ../
