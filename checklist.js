// TESTERS FORGE - UNIVERSAL CUSTOM ROM CHECKLIST
const defaultSchema = [
    {
        id: "sec-boot", icon: "🚀", title: "Boot & System UI",
        items: [
            { id: "b1", text: "Clean flash completes without recovery errors", state: 0 },
            { id: "b2", text: "Setup wizard finishes perfectly without crashing", state: 0 },
            { id: "b3", text: "System animations & transitions run smoothly", state: 0 },
            { id: "b4", text: "Recents menu opens and clears properly", state: 0 },
            { id: "b5", text: "Monet (Material You) theming applies correctly", state: 0 }
        ]
    },
    {
        id: "sec-tele", icon: "📡", title: "Telephony & Network",
        items: [
            { id: "t1", text: "SIM card is detected instantly", state: 0 },
            { id: "t2", text: "Mobile Data connects and switches networks (3G/4G/5G)", state: 0 },
            { id: "t3", text: "VoLTE and VoWiFi make successful calls", state: 0 },
            { id: "t4", text: "Wi-Fi connects to 2.4GHz & 5GHz bands stably", state: 0 },
            { id: "t5", text: "Bluetooth pairs to audio devices without hanging", state: 0 },
            { id: "t6", text: "Portable Wi-Fi Hotspot broadcasts correctly", state: 0 }
        ]
    },
    {
        id: "sec-hard", icon: "⚙️", title: "Hardware & Biometrics",
        items: [
            { id: "h1", text: "Fingerprint scanner registers and unlocks", state: 0 },
            { id: "h2", text: "Face Unlock registers and works reliably", state: 0 },
            { id: "h3", text: "Fast charging triggers properly", state: 0 },
            { id: "h4", text: "Auto-brightness reacts to ambient light smoothly", state: 0 },
            { id: "h5", text: "Haptic feedback / Vibration motor works", state: 0 },
            { id: "h6", text: "Physical volume and power buttons function", state: 0 },
            { id: "h7", text: "NFC reads tags and supports Google Wallet", state: 0 }
        ]
    },
    {
        id: "sec-media", icon: "🎬", title: "Camera & Media",
        items: [
            { id: "m1", text: "All rear camera lenses capture photos", state: 0 },
            { id: "m2", text: "Rear camera records video without HAL crashes", state: 0 },
            { id: "m3", text: "Front camera captures photos and video", state: 0 },
            { id: "m4", text: "Microphone records clean audio", state: 0 },
            { id: "m5", text: "Loudspeaker outputs balanced audio", state: 0 },
            { id: "m6", text: "Hardware video decoding works", state: 0 }
        ]
    },
    {
        id: "sec-sec", icon: "🔒", title: "Security & DRM",
        items: [
            { id: "s1", text: "SELinux is Enforcing", state: 0 },
            { id: "s2", text: "Play Integrity / SafetyNet passes", state: 0 },
            { id: "s3", text: "Widevine L1 DRM active", state: 0 },
            { id: "s4", text: "Device storage is encrypted by default", state: 0 }
        ]
    },
    {
        id: "sec-batt", icon: "🔋", title: "Battery & Deep Sleep",
        items: [
            { id: "ba1", text: "Device enters 'Deep Sleep' when screen is locked", state: 0 },
            { id: "ba2", text: "Overnight idle drain is within normal limits", state: 0 },
            { id: "ba3", text: "Battery percentage updates smoothly", state: 0 }
        ]
    }
];