export type AnimationPreset =
    | 'none'
    | 'fadeIn'
    | 'fadeInUp'
    | 'fadeInDown'
    | 'slideInLeft'
    | 'slideInRight'
    | 'scaleIn'
    | 'bounceIn';

export interface AnimationConfig {
    name: string;
    duration: string;
    easing: string;
    delay: string;
    css: string;
}

export const ANIMATION_PRESETS: Record<AnimationPreset, AnimationConfig> = {
    none: {
        name: 'None',
        duration: '0s',
        easing: 'ease',
        delay: '0s',
        css: ''
    },
    fadeIn: {
        name: 'Fade In',
        duration: '0.5s',
        easing: 'ease-in',
        delay: '0s',
        css: `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `
    },
    fadeInUp: {
        name: 'Fade In Up',
        duration: '0.6s',
        easing: 'ease-out',
        delay: '0s',
        css: `
            @keyframes fadeInUp {
                from { 
                    opacity: 0; 
                    transform: translateY(20px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
        `
    },
    fadeInDown: {
        name: 'Fade In Down',
        duration: '0.6s',
        easing: 'ease-out',
        delay: '0s',
        css: `
            @keyframes fadeInDown {
                from { 
                    opacity: 0; 
                    transform: translateY(-20px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
        `
    },
    slideInLeft: {
        name: 'Slide In Left',
        duration: '0.5s',
        easing: 'ease-out',
        delay: '0s',
        css: `
            @keyframes slideInLeft {
                from { 
                    opacity: 0;
                    transform: translateX(-30px); 
                }
                to { 
                    opacity: 1;
                    transform: translateX(0); 
                }
            }
        `
    },
    slideInRight: {
        name: 'Slide In Right',
        duration: '0.5s',
        easing: 'ease-out',
        delay: '0s',
        css: `
            @keyframes slideInRight {
                from { 
                    opacity: 0;
                    transform: translateX(30px); 
                }
                to { 
                    opacity: 1;
                    transform: translateX(0); 
                }
            }
        `
    },
    scaleIn: {
        name: 'Scale In',
        duration: '0.4s',
        easing: 'ease-out',
        delay: '0s',
        css: `
            @keyframes scaleIn {
                from { 
                    opacity: 0;
                    transform: scale(0.9); 
                }
                to { 
                    opacity: 1;
                    transform: scale(1); 
                }
            }
        `
    },
    bounceIn: {
        name: 'Bounce In',
        duration: '0.8s',
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        delay: '0s',
        css: `
            @keyframes bounceIn {
                0% { 
                    opacity: 0;
                    transform: scale(0.3); 
                }
                50% { 
                    opacity: 1;
                    transform: scale(1.05); 
                }
                70% { transform: scale(0.9); }
                100% { transform: scale(1); }
            }
        `
    }
};

export function getAnimationStyle(preset: AnimationPreset, config?: Partial<AnimationConfig>): React.CSSProperties {
    if (preset === 'none') return {};

    const animation = ANIMATION_PRESETS[preset];
    const duration = config?.duration || animation.duration;
    const easing = config?.easing || animation.easing;
    const delay = config?.delay || animation.delay;

    return {
        animation: `${preset} ${duration} ${easing} ${delay} both`
    };
}
