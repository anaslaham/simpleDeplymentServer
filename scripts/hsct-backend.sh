cd /
cd home/itland/server/stemCells/backend/hsct-backend
git pull origin develop
dotnet publish -o stemCells
systemctl stop stemCellsBackend.service
cp -f -r stemCells/ ../
cd ..
cp -f -r appsettings.json stemCells/
systemctl start stemCellsBackend.service