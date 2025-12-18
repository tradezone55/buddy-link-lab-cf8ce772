export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  domain: string;
  explanation: string;
}

export const examQuestions: ExamQuestion[] = [
  // Domain 1: Networking Concepts (10 questions)
  {
    id: 1,
    question: "Which layer of the OSI model is responsible for routing and forwarding packets?",
    options: ["Data Link Layer", "Network Layer", "Transport Layer", "Session Layer"],
    correctAnswer: 1,
    domain: "Networking Concepts",
    explanation: "The Network Layer (Layer 3) is responsible for routing packets between networks using logical addresses like IP addresses."
  },
  {
    id: 2,
    question: "What is the primary purpose of a subnet mask?",
    options: ["To encrypt network traffic", "To determine network and host portions of an IP address", "To assign MAC addresses", "To manage DNS records"],
    correctAnswer: 1,
    domain: "Networking Concepts",
    explanation: "A subnet mask separates the network portion from the host portion of an IP address, enabling proper routing within and between networks."
  },
  {
    id: 3,
    question: "Which protocol operates at the Transport layer and provides reliable, connection-oriented communication?",
    options: ["UDP", "ICMP", "TCP", "ARP"],
    correctAnswer: 2,
    domain: "Networking Concepts",
    explanation: "TCP (Transmission Control Protocol) provides reliable, ordered, and error-checked delivery of data between applications."
  },
  {
    id: 4,
    question: "What is the default subnet mask for a Class B IP address?",
    options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
    correctAnswer: 1,
    domain: "Networking Concepts",
    explanation: "Class B addresses (128.0.0.0 - 191.255.255.255) use a default subnet mask of 255.255.0.0, providing 16 bits for hosts."
  },
  {
    id: 5,
    question: "Which IPv6 address type is equivalent to a private IPv4 address?",
    options: ["Link-local", "Unique local", "Global unicast", "Multicast"],
    correctAnswer: 1,
    domain: "Networking Concepts",
    explanation: "Unique local addresses (fc00::/7) are similar to IPv4 private addresses and are used for local communications not routed on the internet."
  },
  {
    id: 6,
    question: "What port does HTTPS use by default?",
    options: ["80", "443", "8080", "8443"],
    correctAnswer: 1,
    domain: "Networking Concepts",
    explanation: "HTTPS uses port 443 by default for secure HTTP communications encrypted with TLS/SSL."
  },
  {
    id: 7,
    question: "Which protocol is used to resolve IP addresses to MAC addresses?",
    options: ["DNS", "DHCP", "ARP", "RARP"],
    correctAnswer: 2,
    domain: "Networking Concepts",
    explanation: "ARP (Address Resolution Protocol) maps IP addresses to MAC addresses on a local network segment."
  },
  {
    id: 8,
    question: "What is the maximum transmission unit (MTU) for standard Ethernet?",
    options: ["1000 bytes", "1500 bytes", "9000 bytes", "64 bytes"],
    correctAnswer: 1,
    domain: "Networking Concepts",
    explanation: "Standard Ethernet has an MTU of 1500 bytes. Jumbo frames can support up to 9000 bytes."
  },
  {
    id: 9,
    question: "Which addressing method sends data to all devices on a network segment?",
    options: ["Unicast", "Multicast", "Broadcast", "Anycast"],
    correctAnswer: 2,
    domain: "Networking Concepts",
    explanation: "Broadcast sends data to all devices on the network segment. The IPv4 broadcast address is 255.255.255.255."
  },
  {
    id: 10,
    question: "What is the purpose of NAT (Network Address Translation)?",
    options: ["To encrypt network traffic", "To translate private IP addresses to public addresses", "To assign DNS names", "To route between VLANs"],
    correctAnswer: 1,
    domain: "Networking Concepts",
    explanation: "NAT translates private IP addresses to public addresses, allowing multiple devices to share a single public IP."
  },

  // Domain 2: Infrastructure (10 questions)
  {
    id: 11,
    question: "Which cable type is MOST resistant to electromagnetic interference (EMI)?",
    options: ["UTP Cat 5e", "STP Cat 6", "Fiber optic", "Coaxial"],
    correctAnswer: 2,
    domain: "Infrastructure",
    explanation: "Fiber optic cables use light for transmission and are immune to electromagnetic interference."
  },
  {
    id: 12,
    question: "What is the maximum distance for a Cat 6 Ethernet cable run?",
    options: ["55 meters", "100 meters", "150 meters", "300 meters"],
    correctAnswer: 1,
    domain: "Infrastructure",
    explanation: "Cat 6 cables have a maximum recommended distance of 100 meters (328 feet) for 1 Gbps speeds."
  },
  {
    id: 13,
    question: "Which device operates at Layer 2 of the OSI model?",
    options: ["Router", "Switch", "Hub", "Repeater"],
    correctAnswer: 1,
    domain: "Infrastructure",
    explanation: "Switches operate at Layer 2 (Data Link) and use MAC addresses to forward frames."
  },
  {
    id: 14,
    question: "What is the primary function of a wireless access point?",
    options: ["Route packets between networks", "Provide wireless connectivity to a wired network", "Assign IP addresses", "Filter network traffic"],
    correctAnswer: 1,
    domain: "Infrastructure",
    explanation: "A wireless access point bridges wireless clients to a wired network infrastructure."
  },
  {
    id: 15,
    question: "Which connector type is commonly used with fiber optic cables?",
    options: ["RJ-45", "RJ-11", "SC", "F-type"],
    correctAnswer: 2,
    domain: "Infrastructure",
    explanation: "SC (Subscriber Connector) is a common fiber optic connector. Others include LC, ST, and MT-RJ."
  },
  {
    id: 16,
    question: "What does PoE stand for and what does it provide?",
    options: ["Power over Ethernet - provides electrical power through data cables", "Protocol over Ethernet - manages network protocols", "Packets over Ethernet - handles packet routing", "Performance over Ethernet - optimizes speed"],
    correctAnswer: 0,
    domain: "Infrastructure",
    explanation: "PoE (Power over Ethernet) delivers electrical power along with data over standard Ethernet cables."
  },
  {
    id: 17,
    question: "Which wireless standard operates exclusively in the 5 GHz band?",
    options: ["802.11b", "802.11g", "802.11ac", "802.11n"],
    correctAnswer: 2,
    domain: "Infrastructure",
    explanation: "802.11ac (Wi-Fi 5) operates exclusively in the 5 GHz band, offering higher speeds and less interference."
  },
  {
    id: 18,
    question: "What is a patch panel primarily used for?",
    options: ["Amplifying signals", "Organizing and connecting network cables", "Converting protocols", "Filtering traffic"],
    correctAnswer: 1,
    domain: "Infrastructure",
    explanation: "A patch panel provides an organized central connection point for network cables in a structured cabling system."
  },
  {
    id: 19,
    question: "Which topology connects all devices to a central hub or switch?",
    options: ["Mesh", "Bus", "Star", "Ring"],
    correctAnswer: 2,
    domain: "Infrastructure",
    explanation: "Star topology connects all devices to a central device (hub/switch). It's the most common LAN topology."
  },
  {
    id: 20,
    question: "What is the purpose of a demarcation point?",
    options: ["To separate customer equipment from provider equipment", "To boost signal strength", "To filter network traffic", "To assign IP addresses"],
    correctAnswer: 0,
    domain: "Infrastructure",
    explanation: "The demarcation point (demarc) separates customer premises equipment from the service provider's network."
  },

  // Domain 3: Network Operations (10 questions)
  {
    id: 21,
    question: "What is the primary purpose of SNMP in network management?",
    options: ["Assign IP addresses", "Monitor and manage network devices", "Route packets", "Encrypt data"],
    correctAnswer: 1,
    domain: "Network Operations",
    explanation: "SNMP (Simple Network Management Protocol) monitors and manages network devices, collecting performance data."
  },
  {
    id: 22,
    question: "Which command is used to display the routing table on a Windows system?",
    options: ["netstat -r", "route print", "ipconfig /all", "Both A and B"],
    correctAnswer: 3,
    domain: "Network Operations",
    explanation: "Both 'netstat -r' and 'route print' display the routing table on Windows systems."
  },
  {
    id: 23,
    question: "What does MTTR stand for in network operations?",
    options: ["Maximum Time To Repair", "Mean Time To Repair", "Minimum Time To Restore", "Mean Time To Respond"],
    correctAnswer: 1,
    domain: "Network Operations",
    explanation: "MTTR (Mean Time To Repair) measures the average time required to repair a failed system or component."
  },
  {
    id: 24,
    question: "Which backup type copies all selected files and marks them as backed up?",
    options: ["Incremental", "Differential", "Full", "Copy"],
    correctAnswer: 2,
    domain: "Network Operations",
    explanation: "A full backup copies all selected files and clears the archive bit, marking files as backed up."
  },
  {
    id: 25,
    question: "What is the purpose of a network baseline?",
    options: ["To establish normal network performance metrics", "To encrypt network traffic", "To assign IP addresses", "To create VLANs"],
    correctAnswer: 0,
    domain: "Network Operations",
    explanation: "A baseline documents normal network performance, helping identify anomalies and performance issues."
  },
  {
    id: 26,
    question: "Which protocol is used for secure remote management of network devices?",
    options: ["Telnet", "SSH", "FTP", "HTTP"],
    correctAnswer: 1,
    domain: "Network Operations",
    explanation: "SSH (Secure Shell) provides encrypted remote access to network devices, replacing insecure Telnet."
  },
  {
    id: 27,
    question: "What is the purpose of a VLAN?",
    options: ["To increase network speed", "To segment a network logically without physical separation", "To encrypt traffic", "To assign public IP addresses"],
    correctAnswer: 1,
    domain: "Network Operations",
    explanation: "VLANs (Virtual LANs) logically segment networks, improving security and reducing broadcast domains."
  },
  {
    id: 28,
    question: "Which tool would you use to capture and analyze network traffic?",
    options: ["ping", "traceroute", "Wireshark", "nslookup"],
    correctAnswer: 2,
    domain: "Network Operations",
    explanation: "Wireshark is a protocol analyzer that captures and analyzes network packets in detail."
  },
  {
    id: 29,
    question: "What is a SLA in the context of network services?",
    options: ["System Level Agreement", "Service Level Agreement", "Security Level Agreement", "Storage Level Agreement"],
    correctAnswer: 1,
    domain: "Network Operations",
    explanation: "A Service Level Agreement (SLA) defines the expected level of service, including uptime and response times."
  },
  {
    id: 30,
    question: "Which RAID level provides mirroring without striping?",
    options: ["RAID 0", "RAID 1", "RAID 5", "RAID 10"],
    correctAnswer: 1,
    domain: "Network Operations",
    explanation: "RAID 1 mirrors data across two drives, providing redundancy but no performance improvement from striping."
  },

  // Domain 4: Network Security (10 questions)
  {
    id: 31,
    question: "What type of attack involves intercepting communication between two parties?",
    options: ["DoS attack", "Man-in-the-middle attack", "Phishing", "Brute force"],
    correctAnswer: 1,
    domain: "Network Security",
    explanation: "A man-in-the-middle (MITM) attack intercepts and potentially alters communication between two parties."
  },
  {
    id: 32,
    question: "Which security protocol provides encryption for wireless networks using AES?",
    options: ["WEP", "WPA", "WPA2", "Open"],
    correctAnswer: 2,
    domain: "Network Security",
    explanation: "WPA2 uses AES (Advanced Encryption Standard) for strong wireless encryption."
  },
  {
    id: 33,
    question: "What is the purpose of a firewall?",
    options: ["To speed up network traffic", "To filter and control network traffic based on rules", "To assign IP addresses", "To resolve domain names"],
    correctAnswer: 1,
    domain: "Network Security",
    explanation: "Firewalls filter network traffic based on security rules, controlling what enters and exits the network."
  },
  {
    id: 34,
    question: "Which authentication protocol uses tickets granted by a central server?",
    options: ["RADIUS", "TACACS+", "Kerberos", "LDAP"],
    correctAnswer: 2,
    domain: "Network Security",
    explanation: "Kerberos uses a ticket-granting system where a Key Distribution Center (KDC) issues tickets for authentication."
  },
  {
    id: 35,
    question: "What does IDS stand for in network security?",
    options: ["Integrated Defense System", "Intrusion Detection System", "Internal Data Security", "Internet Defense Service"],
    correctAnswer: 1,
    domain: "Network Security",
    explanation: "An Intrusion Detection System (IDS) monitors network traffic for suspicious activity and alerts administrators."
  },
  {
    id: 36,
    question: "Which port is used by SFTP for secure file transfers?",
    options: ["20", "21", "22", "23"],
    correctAnswer: 2,
    domain: "Network Security",
    explanation: "SFTP (SSH File Transfer Protocol) uses port 22, the same as SSH, for encrypted file transfers."
  },
  {
    id: 37,
    question: "What is social engineering in the context of security?",
    options: ["Building secure networks", "Manipulating people to reveal confidential information", "Installing network hardware", "Configuring firewalls"],
    correctAnswer: 1,
    domain: "Network Security",
    explanation: "Social engineering exploits human psychology to trick people into revealing sensitive information or access."
  },
  {
    id: 38,
    question: "Which VPN protocol operates at Layer 2 of the OSI model?",
    options: ["IPSec", "L2TP", "SSL/TLS", "SSH"],
    correctAnswer: 1,
    domain: "Network Security",
    explanation: "L2TP (Layer 2 Tunneling Protocol) operates at the Data Link layer and is often combined with IPSec for encryption."
  },
  {
    id: 39,
    question: "What is the principle of least privilege?",
    options: ["Giving all users admin rights", "Providing users only the access they need to perform their job", "Removing all user accounts", "Encrypting all data"],
    correctAnswer: 1,
    domain: "Network Security",
    explanation: "Least privilege means granting users minimum access rights needed for their role, reducing security risks."
  },
  {
    id: 40,
    question: "Which type of attack floods a target with traffic to make it unavailable?",
    options: ["Phishing", "SQL injection", "DDoS", "Ransomware"],
    correctAnswer: 2,
    domain: "Network Security",
    explanation: "DDoS (Distributed Denial of Service) attacks overwhelm targets with traffic from multiple sources."
  },

  // Domain 5: Network Troubleshooting (10 questions)
  {
    id: 41,
    question: "Which command tests connectivity to a remote host and measures round-trip time?",
    options: ["tracert", "ping", "nslookup", "netstat"],
    correctAnswer: 1,
    domain: "Network Troubleshooting",
    explanation: "The ping command sends ICMP echo requests to test connectivity and measure response time."
  },
  {
    id: 42,
    question: "What does a blinking amber light on a network switch port typically indicate?",
    options: ["Port is connected at full speed", "Port has errors or collisions", "Port is disabled", "Port is unused"],
    correctAnswer: 1,
    domain: "Network Troubleshooting",
    explanation: "Amber/orange blinking usually indicates port errors, collisions, or that the port is in a fault state."
  },
  {
    id: 43,
    question: "Which tool would you use to test if a cable is properly terminated?",
    options: ["Multimeter", "Cable tester", "Spectrum analyzer", "Protocol analyzer"],
    correctAnswer: 1,
    domain: "Network Troubleshooting",
    explanation: "A cable tester verifies that all wires in a cable are properly connected and in the correct order."
  },
  {
    id: 44,
    question: "What is the first step in the CompTIA troubleshooting methodology?",
    options: ["Establish a theory", "Test the theory", "Identify the problem", "Document findings"],
    correctAnswer: 2,
    domain: "Network Troubleshooting",
    explanation: "The first step is to identify the problem by gathering information and questioning users."
  },
  {
    id: 45,
    question: "If you receive a 'Destination Host Unreachable' message, what does this typically indicate?",
    options: ["DNS failure", "No route to the destination network", "Port is closed", "Service is not running"],
    correctAnswer: 1,
    domain: "Network Troubleshooting",
    explanation: "This message indicates the router cannot find a path to the destination network."
  },
  {
    id: 46,
    question: "Which command displays current TCP/IP connections on a Windows system?",
    options: ["ipconfig", "netstat", "nbtstat", "hostname"],
    correctAnswer: 1,
    domain: "Network Troubleshooting",
    explanation: "The netstat command displays active network connections, listening ports, and routing tables."
  },
  {
    id: 47,
    question: "What is the purpose of a loopback test?",
    options: ["To test network cables", "To test if the local TCP/IP stack is functioning", "To test DNS resolution", "To test router configuration"],
    correctAnswer: 1,
    domain: "Network Troubleshooting",
    explanation: "Pinging 127.0.0.1 (loopback) tests if the local TCP/IP stack is properly installed and functioning."
  },
  {
    id: 48,
    question: "What would cause an IP address conflict?",
    options: ["Using DHCP", "Two devices with the same IP address on the network", "Incorrect subnet mask", "DNS cache issues"],
    correctAnswer: 1,
    domain: "Network Troubleshooting",
    explanation: "An IP conflict occurs when two devices are assigned the same IP address, often from misconfigured static IPs."
  },
  {
    id: 49,
    question: "Which tool traces the path packets take to reach a destination?",
    options: ["ping", "traceroute/tracert", "nslookup", "arp"],
    correctAnswer: 1,
    domain: "Network Troubleshooting",
    explanation: "Traceroute (tracert on Windows) shows each hop packets take to reach the destination."
  },
  {
    id: 50,
    question: "What should you check first if a single computer cannot access the network but others can?",
    options: ["Router configuration", "Switch configuration", "Local computer's network settings", "ISP connection"],
    correctAnswer: 2,
    domain: "Network Troubleshooting",
    explanation: "If only one computer is affected, start with local settings: cable, NIC, IP configuration, etc."
  }
];

export const domains = [
  "Networking Concepts",
  "Infrastructure",
  "Network Operations",
  "Network Security",
  "Network Troubleshooting"
];
