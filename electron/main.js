const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production' || !app.isPackaged;

let mainWindow;
let sidebarWindow;
let overlayWindow;

function createMainWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: Math.min(420, width * 0.4),
    height: Math.min(640, height * 0.75),
    webPreferences: { nodeIntegration: false, contextIsolation: true },
    title: 'Mochi Meadow',
  });
  mainWindow.loadURL(isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, '../dist/index.html')}`);
  if (isDev) mainWindow.webContents.openDevTools({ mode: 'detach' });
  mainWindow.on('closed', () => { mainWindow = null; });
}

function createSidebarWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  sidebarWindow = new BrowserWindow({
    width: 48,
    height: height,
    x: width - 48,
    y: 0,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: { nodeIntegration: false, contextIsolation: true },
  });
  sidebarWindow.loadURL(isDev ? 'http://localhost:5173/#/sidebar' : `file://${path.join(__dirname, '../dist/index.html')}#/sidebar`);
  sidebarWindow.setAlwaysOnTop(true, 'floating');
  sidebarWindow.on('closed', () => { sidebarWindow = null; });
}

function createOverlayWindow() {
  overlayWindow = new BrowserWindow({
    width: 200,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: { nodeIntegration: false, contextIsolation: true },
  });
  overlayWindow.loadURL(isDev ? 'http://localhost:5173/#/overlay' : `file://${path.join(__dirname, '../dist/index.html')}#/overlay`);
  overlayWindow.on('closed', () => { overlayWindow = null; });
}

app.whenReady().then(() => {
  createMainWindow();
  createSidebarWindow();
  // Overlay (pet popup) can be created when we need to show a reminder
  // createOverlayWindow();
});

app.on('window-all-closed', () => app.quit());
