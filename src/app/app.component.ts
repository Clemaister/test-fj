import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './app.config';
import { FsService } from 'ngx-fs';

const ipcRenderer = require('electron').ipcRenderer;

@Component({
    selector: 'app-root',
    templateUrl: require('./app.component.html'),
    styleUrls: [require('./app.component.scss')]
})
export class AppComponent {
	
	private version_text = 'Latest version';
	
	constructor(public electronService: ElectronService) {

		const self = this;
        console.log('AppConfig', AppConfig);
		
        ipcRenderer.on('updateReady', function(event, text) {
			console.log('Update version text')
            self.version_text = 'New version ready !';
        })

        if (electronService.isElectron()) {
            console.log('Mode electron');
            console.log('Electron ipcRenderer', electronService.ipcRenderer);
            console.log('NodeJS childProcess', electronService.childProcess);
        } else {
            console.log('Mode web');
        }
		
    }
	
	update () {
		ipcRenderer.send('quitAndInstall');
	}
}
