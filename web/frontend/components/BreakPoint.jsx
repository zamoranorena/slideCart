import { useBreakpoints } from '@shopify/polaris';
  
  export function BreakPoint_mdDown({element}) {
     
    const {mdDown} = useBreakpoints();
     
    return (
     element
    );
  }

  export function BreakPoint_smDown() {
     
    const {smDown} = useBreakpoints();
     
    return (
      smDown
    );
  }

  export function BreakPoint_mdUp({element}) {
     
    const {mdUp} = useBreakpoints();
     
    return (
     element
    );
  }