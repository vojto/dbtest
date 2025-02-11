import { registerPlugin, WebPlugin } from '@capacitor/core';

class EchoWeb extends WebPlugin {
  async echo(options) {
    return {
      value: "This is a test response from web implementation"
    };
  }
}

export const Echo = registerPlugin('Echo', {
  web: new EchoWeb()
});
