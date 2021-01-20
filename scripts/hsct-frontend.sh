cd /
cd home/itland/server/stemCells/frontend/hsct-frontend/
git reset --hard
git pull origin dev
npm i
npm run build
cd ..
rm -f -r build
cp -f -r  hsct-frontend/build ./