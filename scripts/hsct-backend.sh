cd /
cd home/itland/server/stemCells/backend/hsct-backend
git reset --hard
git pull origin master
echo -e "ITL@nd@Server@RED@2021" | sudo -S -k  systemctl stop stemCellsBackend.service
echo -e "ITL@nd@Server@RED@2021" | sudo -S -k  dotnet publish -o stemCells
echo -e "ITL@nd@Server@RED@2021" | sudo -S -k  cp -f -r stemCells/ ../
cd ..
cp -f -r appsettings.json stemCells/
echo -e "ITL@nd@Server@RED@2021" | sudo -S -k  systemctl start stemCellsBackend.service