//
//  EchoPlugin.m
//  App
//
//  Created by Vojtech Rinik on 07/02/2025.
//

#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
   CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
