import {
    ButtonGroup,
    Button
} from "@shopify/polaris";
import { useTranslation } from 'react-i18next';

import {useState} from "react";


export function Languages() {
    const [useButtons,setButtons] = useState({
        en:false,
        es:false,
        de:false,
        fr:false,
    });
    const { i18n }  = useTranslation();

  return (
      <ButtonGroup segmented>
          <Button disabled={useButtons.en} onClick={() => i18n.changeLanguage('en') && setButtons(prevState => ({...prevState, en: true,es:false,de:false,fr:false}))}>EN</Button>
          <Button disabled={useButtons.es}  onClick={() => i18n.changeLanguage('es') && setButtons(prevState => ({...prevState, en: false,es:true,de:false,fr:false})) }>ES</Button>
          <Button disabled={useButtons.de}  onClick={() => i18n.changeLanguage('de') && setButtons(prevState => ({...prevState, en: false,es:false,de:true,fr:false})) }>DE</Button>
          <Button disabled={useButtons.fr}  onClick={() => i18n.changeLanguage('fr') && setButtons(prevState => ({...prevState, en: false,es:false,de:false,fr:true})) }>FR</Button>
      </ButtonGroup>
  );
}

