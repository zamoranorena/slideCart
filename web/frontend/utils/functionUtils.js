import { hsbToHex } from '@shopify/polaris';
export function hsbToHexOutPrefix(args) {
    const color = hsbToHex(
        {
            hue: args.hue || 0,
            saturation: args.saturation || 0,
            brightness: args.brightness || 0
        }).replace(/\#/, "");
    return color;
}
export function currencyShop (searchText)
{
  var currency = '$';
  if(!!searchText)
  {
    var currency_symbols = [
      'Lek',	//Albania Lek
      '؋', //Afghanistan Afghani
      '$', //Argentina Peso
      'ƒ', //Aruba Guilder
      '$', //Australia Dollar
      '₼', //Azerbaijan Manat
      '$', //Bahamas Dollar
      '$', //Barbados Dollar
      'Br', //Belarus Ruble
      'BZ$',	//Belize Dollar
      '$',	//Bermuda Dollar
      '$b', //Bolivia Bolíviano
      'KM', //Bosnia and Herzegovina Convertible Mark
      'P',	//Botswana Pula
      'лв', //Bulgaria Lev
      'R$', //Brazil Real
      '$',	//Brunei Darussalam Dollar
      '៛',	 //Cambodia Riel
      '$',	 //Canada Dollar
      '$',	 //Cayman Islands Dollar
      '$',	 //Chile Peso
      '¥',	 //China Yuan Renminbi
      '$',	 //Colombia Peso
      '₡',	 //Costa Rica Colon
      'kn', //Croatia Kuna
      '₱',	 //Cuba Peso
      'Kč', //Czech Republic Koruna
      'kr', //Denmark Krone
      'RD$',	//Dominican Republic Peso
      '$', //East Caribbean Dollar
      '£', //Egypt Pound
      '$', //El Salvador Colon
      '€', //Euro Member Countries
      '£', //Falkland Islands (Malvinas) Pound
      '$', //Fiji Dollar
      '¢', //Ghana Cedi
      '£', //Gibraltar Pound
      'Q', //Guatemala Quetzal
      '£', //Guernsey Pound
      '$', //Guyana Dollar
      'L', //Honduras Lempira
      '$', //Hong Kong Dollar
      'Ft', //Hungary Forint
      'kr', //Iceland Krona
      '₹', //India Rupee
      'Rp', //Indonesia Rupiah
      '﷼', //Iran Rial
      '£', //Isle of Man Pound
      '₪', //Israel Shekel
      'J$', //Jamaica Dollar
      '¥', //Japan Yen
      '£', //Jersey Pound
      'лв',	//'K' //zakhstan Tenge
      '₩', //Korea (North) Won
      '₩', //Korea (South) Won
      'лв', //Kyrgyzstan Som
      '₭', //Laos Kip
      '£', //Lebanon Pound
      '$', //Liberia Dollar
      'ден', //Macedonia Denar
      'RM', //Malaysia Ringgit
      '₨', //Mauritius Rupee
      '$', //Mexico Peso
      '₮', //Mongolia Tughrik
      'MT', //Mozambique Metical
      '$', //Namibia Dollar
      '₨', //Nepal Rupee
      'ƒ', //Netherlands Antilles Guilder
      '$', //New Zealand Dollar
      'C$', //Nicaragua Cordoba
      '₦', //Nigeria Naira
      'kr', //Norway Krone
      '﷼', //Oman Rial
      '₨', //Pakistan Rupee
      'B/.', //Panama Balboa
      'Gs',	//Paraguay Guarani
      'S/.', //Peru Sol
      '₱', //Philippines Peso
      'zł', //Poland Zloty
      '﷼', //Qatar Riyal
      'lei', //Romania Leu
      '₽', //Russia Ruble
      '£', //Saint Helena Pound
      '﷼,', //Saudi Arabia Riyal
      'Дин.', //Serbia Dinar
      '₨', //Seychelles Rupee
      '$', //Singapore Dollar
      '$', //Solomon Islands Dollar
      'S', //Somalia Shilling
      'R', //South Africa Rand
      '₨', //Sri Lanka Rupee
      'kr', //Sweden Krona
      'CHF', //Switzerland Franc
      '$', //Suriname Dollar
      '£', //Syria Pound
      'NT$', //Taiwan New Dollar
      '฿', //Thailand Baht
      'TT$', //Trinidad and Tobago Dollar
      '₺',	//Turkey Lira
      '$', //Tuvalu Dollar
      '₴', //Ukraine Hryvnia
      '£', //United Kingdom Pound
      '$', //United States Dollar
      '$U', //Uruguay Peso
      'лв', //Uzbekistan Som
      'Bs', //Venezuela Bolívar
      '₫', //Viet Nam Dong
      '﷼', //Yemen Rial
      'Z$', //Zimbabwe Dollar
      'QAR', //QATAR
    ];
    var cadena = searchText;
    currency_symbols.forEach(function(e){
      var expression = e;
      var index = cadena.indexOf(expression);
        if(index >= 0) {
          currency = e;
          return false;
        }
    });
  };

  return currency;
};