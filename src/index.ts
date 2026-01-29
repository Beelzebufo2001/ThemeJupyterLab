import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IThemeManager } from '@jupyterlab/apputils';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the SmoothBrain_Theme extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'SmoothBrain_Theme:plugin',
  description: 'A smoothing UI for my shaky-ass&full-of-anxiety brain from the cold-hard-cash programming world',
  autoStart: true,
  requires: [IThemeManager],
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, manager: IThemeManager, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension SmoothBrain_Theme is activated!');
    const style = 'SmoothBrain_Theme/index.css';

    manager.register({
      name: 'SmoothBrain_Theme',
      isLight: true,
      load: () => manager.loadCSS(style),
      unload: () => Promise.resolve(undefined)
    });

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('SmoothBrain_Theme settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for SmoothBrain_Theme.', reason);
        });
    }
  }
};

export default plugin;
