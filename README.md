# vue-vext-plugin
A vue plugin that adds a simple vext interface to communicate with Venice Unleashed.

> Version 2+ only work with Vue 3.0. For the Vue 2.0 implemetation use 1.x of the plugin.

## Installation
With npm
```
npm install --save-dev vue-vext-plugin
```

With yarn
```
yarn add vue-vext-plugin
```

## Usage
This vue plugin adds a typesafe interface to Vue's instance that can be accessed at `$vext`. All known WebUI.Call functions have been implemented

### Setup
This is just a regular Vue plugin and can be registered like other Vue plugins.
```ts
// main.ts
import { createApp } from 'vue';
import VextPlugin from 'vue-vext-plugin';
import App from './App.vue';

const app = createApp(App);

app.use(VextPlugin);

app.mount('#app');
```

### Example
After the plugin has been registered in can be accessed from the Vue prototype
```ts
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        someFunction() {
            this.$vext.DispatchEventLocal('MyModule:MyEvent', { some: "payload" });
        }
    }
})
```
There's also support for Vue 3.0's composition api
```ts
import { defineComponent } from 'vue';
import { useVext } from 'vue-vext-plugin';

export default defineComponent({
    setup() {
        const vext = useVext();

        return {
            someFunction: () => vext.DispatchEventLocal('MyModule:MyEvent', { some: "payload" });
        };
    }
})
```

### Development Tools
This plugin has more then just a typesafe Vext interface. It also has a built in emulator that can be used to register event handlers.
By default the plugin will check whether an emulator is needed. This is usually the case when running outside of Venice Unleashed.

This plugin offers a simple api to register event handlers on the emulator.
Below is a simple example on how you could use a class as event handler:
```ts
// main.ts

// If using webpack, use the environment plugin to disable this line
// so your production code will not contain the emulator code.
import './debug/eventhandler';

// debug/eventhandler.ts
import { VextEmulatorRegistry } from 'vue-vext-plugin';

class MyModuleEventHandler {
    constructor() {
        VextEmulatorRegistry.registerLocalEvent('MyModule:MyEvent', this.handleMyEvent, this);
    }

    handleMyEvent(myArgument: string) {
        console.log('MyEvent triggered:', myArgument);
    } 
}

export default new MyModuleEventHandler();
```
A more detailed documentation from the emulator will be added later on. I already added some tsdoc in case you are curious.