import React, { useState, useEffect } from 'react';

const ComplexASCIIPortfolio = () => {
    const [activeNode, setActiveNode] = useState(null);
    const [subNode, setSubNode] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [systemNoise, setSystemNoise] = useState('');
    const [decorFrame, setDecorFrame] = useState(0);
    const [showNetwork, setShowNetwork] = useState(true);

    // Node network structure
    const nodes = [
        {
            id: 'work',
            x: 30,
            y: 20,
            label: 'Projects',
            size: 'large',
            ascii: `╭━━━━╮
┃ PRJ ┃
┃     ┃
╰━━━━╯`,
            subnodes: [
                { id: 'web', label: 'Web', x: 20, y: 35 },
                { id: 'print', label: 'Print', x: 35, y: 40 },
                { id: 'motion', label: 'Motion', x: 40, y: 30 }
            ]
        },
        {
            id: 'process',
            x: 70,
            y: 25,
            label: 'Process',
            size: 'medium',
            ascii: `▀▄▀▄▀▄
█PRC█
▄▀▄▀▄▀`,
            subnodes: [
                { id: 'research', label: 'Research', x: 65, y: 40 },
                { id: 'experiments', label: 'Experiments', x: 75, y: 45 }
            ]
        },
        {
            id: 'lab',
            x: 15,
            y: 60,
            label: 'Lab',
            size: 'small',
            ascii: `╔══╗
║▒▒║
╚══╝`,
            subnodes: [
                { id: 'tools', label: 'Tools', x: 10, y: 75 }
            ]
        },
        {
            id: 'archive',
            x: 85,
            y: 60,
            label: 'Archive',
            size: 'medium',
            ascii: `┌─┐
│A│
└─┘`,
            subnodes: [
                { id: 'gallery', label: 'Gallery', x: 80, y: 75 },
                { id: 'timeline', label: 'Timeline', x: 90, y: 70 }
            ]
        }
    ];

    // Panel content mapping
    const panelContent = {
        work: {
            web: [
                { id: 1, title: 'Project_01', type: 'Website', year: '2024' },
                { id: 2, title: 'Project_02', type: 'Application', year: '2024' }
            ],
            print: [
                { id: 3, title: 'Project_03', type: 'Poster', year: '2023' },
                { id: 4, title: 'Project_04', type: 'Book', year: '2023' }
            ],
            motion: [
                { id: 5, title: 'Project_05', type: 'Animation', year: '2024' }
            ]
        }
    };

    const decorFrames = ['╔═╗', '║ ║', '╚═╝', '│ │', '└─┘', '┌─┐'];

    useEffect(() => {
        const interval = setInterval(() => {
            setDecorFrame((prev) => (prev + 1) % decorFrames.length);
            setSystemNoise(generateNoise());
        }, 150);
        return () => clearInterval(interval);
    }, []);

    const generateNoise = () => {
        const chars = '░▒▓█';
        return Array(5).fill()
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join('');
    };

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        setMousePosition({
            x: (clientX / window.innerWidth) * 100,
            y: (clientY / window.innerHeight) * 100
        });
    };

    const handleNodeClick = (nodeId) => {
        setActiveNode(nodeId);
        setShowNetwork(false);
    };

    const handleBack = () => {
        if (subNode) {
            setSubNode(null);
        } else {
            setActiveNode(null);
            setShowNetwork(true);
        }
    };

    return (
        <div
            className="min-h-screen bg-zinc-100 text-zinc-900 cursor-crosshair overflow-x-hidden font-mono"
            onMouseMove={handleMouseMove}
        >
            {/* Background Matrix */}
            <div className="fixed inset-0 opacity-10 pointer-events-none">
                {Array(30).fill().map((_, i) => (
                    <div key={i} className="text-xs opacity-30 whitespace-pre">
                        {Array(60).fill().map((_, j) => (
                            <span key={j}>
                                {Math.random() > 0.8 ? decorFrames[decorFrame] : (Math.random() > 0.5 ? '0' : '1')}
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            {/* System Info */}
            <div className="fixed top-4 left-4 text-xs z-20">
                <pre className="text-zinc-600">
                    {`╔════ SYSTEM_STATUS ════╗
║ ${systemNoise} ${decorFrames[decorFrame]} ${systemNoise} ║
║ x.${mousePosition.x.toFixed(0).padStart(3, '0')} y.${mousePosition.y.toFixed(0).padStart(3, '0')}    ║
╚════════════════════════╝`}
                </pre>
            </div>

            {/* Main Content Area */}
            <div className="relative min-h-screen">
                {showNetwork ? (
                    // Node Network View
                    <div className="relative w-full h-screen">
                        {nodes.map((node) => (
                            <React.Fragment key={node.id}>
                                <div
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                    style={{
                                        left: `${node.x}%`,
                                        top: `${node.y}%`,
                                        zIndex: 30,
                                    }}
                                >
                                    <button
                                        className="relative group"
                                        onClick={() => handleNodeClick(node.id)}
                                    >
                                        <pre className="text-xs sm:text-sm whitespace-pre transition-colors duration-300 text-zinc-600 group-hover:text-zinc-900">
                                            {node.ascii}
                                        </pre>
                                    </button>
                                </div>

                                {/* Connection Lines */}
                                {node.subnodes.map((sub) => (
                                    <div
                                        key={sub.id}
                                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                        style={{
                                            left: `${sub.x}%`,
                                            top: `${sub.y}%`,
                                            zIndex: 25,
                                        }}
                                    >
                                        <div className="text-zinc-600/50 hover:text-zinc-900/90 transition-all">
                                            <pre className="text-xs sm:text-sm whitespace-pre">{`· ${sub.label} ·`}</pre>
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    // Content View
                    <div className="container mx-auto px-4 py-16">
                        {/* Content Header with Close Button */}
                        <div className="border-b border-zinc-900/30 mb-8 flex justify-between items-start">
                            <div>
                                <pre className="p-4 text-sm">
                                    {`╔═══ ${nodes.find(n => n.id === activeNode)?.label.toUpperCase()} ═${subNode ? ` > ${subNode.toUpperCase()}` : ''} ═${'═'.repeat(15)}╗
║ ${systemNoise} ${decorFrames[decorFrame]} ${systemNoise} ║`}
                                </pre>
                            </div>
                            <button
                                onClick={handleBack}
                                className="p-4 text-zinc-600 hover:text-green-600 transition-colors"
                            >
                                <pre className="text-xs">
{`▛▀▀▜
▌×▐
▙▄▄▟`}
                                </pre>
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="max-w-4xl mx-auto">
                            {activeNode === 'work' && !subNode && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {nodes
                                        .find(n => n.id === activeNode)
                                        ?.subnodes.map((sub) => (
                                            <button
                                                key={sub.id}
                                                onClick={() => setSubNode(sub.id)}
                                                className="text-left"
                                            >
                                                <pre className="text-xs text-zinc-600 hover:text-zinc-900 cursor-pointer hover:border-green-600 transition-all">
                                                    {`╭────────────╮
│  ${sub.label.padEnd(10)} │
│ ${decorFrames[decorFrame]}  ${systemNoise} │
╰────────────╯`}
                                                </pre>
                                            </button>
                                        ))}
                                </div>
                            )}

                            {/* Subnode Content */}
                            {subNode && panelContent[activeNode]?.[subNode] && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {panelContent[activeNode][subNode].map((item) => (
                                        <div
                                            key={item.id}
                                            className="border border-zinc-900/20 p-4 hover:border-green-600/40 transition-colors"
                                        >
                                            <pre className="text-xs text-zinc-600">
                                                {`${item.title}
Type: ${item.type}
Year: ${item.year}
${decorFrames[decorFrame]} ${systemNoise}`}
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Status Line */}
            <div className="fixed bottom-4 right-4 text-xs sm:text-sm text-zinc-600 z-20">
                <pre>
                    {`${decorFrames[decorFrame]} [${activeNode || 'IDLE'}${subNode ? `/${subNode}` : ''}] ${systemNoise} ${decorFrames[(decorFrame + 2) % decorFrames.length]}`}
                </pre>
            </div>
        </div>
    );
};

export default ComplexASCIIPortfolio;