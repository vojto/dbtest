//
//  Echo.swift
//  App
//
//  Created by Vojtech Rinik on 07/02/2025.
//

import Foundation
import Capacitor

@objc(EchoPlugin)
public class EchoPlugin: CAPPlugin {
    @objc func echo(_ call: CAPPluginCall) {
        // Create a 5MB string by repeating a base string
        let baseString = "This is a test string that will be repeated many times to create approximately 5MB of data. "
        let targetSize = 5 * 1024 * 1024 // 5MB in bytes
        let repetitions = targetSize / baseString.utf8.count
        
        let largeString = String(repeating: baseString, count: repetitions)
        
        call.resolve([
            "value": largeString
        ])
    }
}
