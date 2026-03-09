const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow(){
  const win = new BrowserWindow({
    width: 1100, height: 780, minWidth: 360, minHeight: 500,
    title: 'Meine Rezepte', backgroundColor: '#fdf6ec',
    webPreferences: { nodeIntegration:false, contextIsolation:true, partition:'persist:rezepte' }
  });
  win.loadFile(path.join(__dirname, '../src/index.html'));
  win.setMenuBarVisibility(false);
  win.webContents.setWindowOpenHandler(({url})=>{ shell.openExternal(url); return {action:'deny'}; });
  win.webContents.on('will-navigate',(e,url)=>{ if(!url.startsWith('file://')){ e.preventDefault(); shell.openExternal(url); } });
}
app.whenReady().then(createWindow);
app.on('window-all-closed',()=>{ if(process.platform!=='darwin') app.quit(); });
app.on('activate',()=>{ if(BrowserWindow.getAllWindows().length===0) createWindow(); });
