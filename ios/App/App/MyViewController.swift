//
//  MyViewController.swift
//  App
//
//  Created by Vojtech Rinik on 07/02/2025.
//

import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    // additional code
    
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(EchoPlugin())
    }
}
