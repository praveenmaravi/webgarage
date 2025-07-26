// animationUtils.ts

// Function to add a new animation to the timeline
export const addAnimation = (animations: any[], newAnimation: any) => {
    return [...animations, newAnimation];
  };
  
  // Function to remove an animation from the timeline by its ID
  export const removeAnimation = (animations: any[], animationId: string) => {
    return animations.filter((animation) => animation.id !== animationId);
  };
  
  // Function to update an existing animation's properties (e.g., duration, easing)
  export const updateAnimation = (animations: any[], animationId: string, updatedProps: any) => {
    return animations.map((animation) =>
      animation.id === animationId ? { ...animation, ...updatedProps } : animation
    );
  };
  
  // Function to get an animation by its ID
  export const getAnimationById = (animations: any[], animationId: string) => {
    return animations.find((animation) => animation.id === animationId);
  };
  
  // Function to duplicate an animation in the timeline
  export const duplicateAnimation = (animations: any[], animationId: string) => {
    const animationToDuplicate = animations.find((animation) => animation.id === animationId);
    if (animationToDuplicate) {
      const newAnimation = { ...animationToDuplicate, id: generateUniqueId() };
      return [...animations, newAnimation];
    }
    return animations;
  };
  
  // Function to generate a unique ID for animations
  const generateUniqueId = () => {
    return 'anim_' + Math.random().toString(36).substr(2, 9);
  };
  
  // Function to check if an animation exists by its ID
  export const animationExists = (animations: any[], animationId: string) => {
    return animations.some((animation) => animation.id === animationId);
  };
  
  // Function to reset all animations (clear timeline)
  export const resetAnimations = () => {
    return [];
  };
  
  // Function to apply easing to an animation
  export const applyEasing = (animation: any, easing: string) => {
    return { ...animation, easing };
  };
  
  // Example of easing preset options
  export const easingOptions = [
    'ease-in',
    'ease-out',
    'ease-in-out',
    'linear',
    'bounce',
    'elastic',
  ];
  
  // Function to validate animation properties
  export const validateAnimationProps = (animation: any) => {
    const { duration, delay, easing } = animation;
    if (duration <= 0) {
      throw new Error('Duration must be greater than zero');
    }
    if (delay < 0) {
      throw new Error('Delay cannot be negative');
    }
    if (!easingOptions.includes(easing)) {
      throw new Error(`Invalid easing type. Available options: ${easingOptions.join(', ')}`);
    }
    return true;
  };
  