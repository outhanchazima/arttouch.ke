import { Injectable, signal, computed } from '@angular/core';

export interface Location {
  id: string;
  name: string;
}

export interface Constituency {
  id: string;
  name: string;
  locations: Location[];
}

export interface County {
  id: string;
  name: string;
  constituencies: Constituency[];
}

export interface Country {
  code: string;
  name: string;
  phoneCode: string;
  counties: County[];
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private countries = signal<Country[]>([
    // ============================================
    // KENYA
    // ============================================
    {
      code: 'KE',
      name: 'Kenya',
      phoneCode: '+254',
      counties: [
        {
          id: 'nairobi',
          name: 'Nairobi',
          constituencies: [
            {
              id: 'westlands',
              name: 'Westlands',
              locations: [
                { id: 'westlands-cbd', name: 'Westlands CBD' },
                { id: 'parklands', name: 'Parklands' },
                { id: 'highridge', name: 'Highridge' },
                { id: 'kangemi', name: 'Kangemi' },
                { id: 'mountain-view', name: 'Mountain View' },
              ],
            },
            {
              id: 'dagoretti-north',
              name: 'Dagoretti North',
              locations: [
                { id: 'kilimani', name: 'Kilimani' },
                { id: 'kileleshwa', name: 'Kileleshwa' },
                { id: 'lavington', name: 'Lavington' },
                { id: 'kawangware', name: 'Kawangware' },
              ],
            },
            {
              id: 'langata',
              name: "Lang'ata",
              locations: [
                { id: 'karen', name: 'Karen' },
                { id: 'langata', name: "Lang'ata" },
                { id: 'nairobi-west', name: 'Nairobi West' },
                { id: 'south-c', name: 'South C' },
              ],
            },
            {
              id: 'starehe',
              name: 'Starehe',
              locations: [
                { id: 'nairobi-cbd', name: 'Nairobi CBD' },
                { id: 'pangani', name: 'Pangani' },
                { id: 'ngara', name: 'Ngara' },
              ],
            },
            {
              id: 'kasarani',
              name: 'Kasarani',
              locations: [
                { id: 'kasarani', name: 'Kasarani' },
                { id: 'roysambu', name: 'Roysambu' },
                { id: 'githurai', name: 'Githurai' },
                { id: 'zimmerman', name: 'Zimmerman' },
              ],
            },
            {
              id: 'embakasi-east',
              name: 'Embakasi East',
              locations: [
                { id: 'embakasi', name: 'Embakasi' },
                { id: 'utawala', name: 'Utawala' },
                { id: 'mihango', name: 'Mihango' },
              ],
            },
          ],
        },
        {
          id: 'mombasa',
          name: 'Mombasa',
          constituencies: [
            {
              id: 'mvita',
              name: 'Mvita',
              locations: [
                { id: 'mombasa-cbd', name: 'Mombasa CBD' },
                { id: 'old-town', name: 'Old Town' },
                { id: 'ganjoni', name: 'Ganjoni' },
              ],
            },
            {
              id: 'nyali',
              name: 'Nyali',
              locations: [
                { id: 'nyali', name: 'Nyali' },
                { id: 'bamburi', name: 'Bamburi' },
                { id: 'shanzu', name: 'Shanzu' },
              ],
            },
            {
              id: 'kisauni',
              name: 'Kisauni',
              locations: [
                { id: 'kisauni', name: 'Kisauni' },
                { id: 'mtopanga', name: 'Mtopanga' },
              ],
            },
          ],
        },
        {
          id: 'kisumu',
          name: 'Kisumu',
          constituencies: [
            {
              id: 'kisumu-central',
              name: 'Kisumu Central',
              locations: [
                { id: 'kisumu-cbd', name: 'Kisumu CBD' },
                { id: 'milimani-kisumu', name: 'Milimani' },
                { id: 'migosi', name: 'Migosi' },
              ],
            },
            {
              id: 'kisumu-east',
              name: 'Kisumu East',
              locations: [
                { id: 'nyamasaria', name: 'Nyamasaria' },
                { id: 'kajulu', name: 'Kajulu' },
              ],
            },
          ],
        },
        {
          id: 'nakuru',
          name: 'Nakuru',
          constituencies: [
            {
              id: 'nakuru-town-east',
              name: 'Nakuru Town East',
              locations: [
                { id: 'nakuru-cbd', name: 'Nakuru CBD' },
                { id: 'section-58', name: 'Section 58' },
                { id: 'milimani-nakuru', name: 'Milimani' },
              ],
            },
            {
              id: 'nakuru-town-west',
              name: 'Nakuru Town West',
              locations: [
                { id: 'london', name: 'London' },
                { id: 'kaptembwo', name: 'Kaptembwo' },
              ],
            },
          ],
        },
        {
          id: 'kiambu',
          name: 'Kiambu',
          constituencies: [
            {
              id: 'ruiru',
              name: 'Ruiru',
              locations: [
                { id: 'ruiru-town', name: 'Ruiru Town' },
                { id: 'membley', name: 'Membley' },
                { id: 'kimbo', name: 'Kimbo' },
              ],
            },
            {
              id: 'thika-town',
              name: 'Thika Town',
              locations: [
                { id: 'thika-cbd', name: 'Thika CBD' },
                { id: 'makongeni', name: 'Makongeni' },
              ],
            },
            {
              id: 'juja',
              name: 'Juja',
              locations: [
                { id: 'juja-town', name: 'Juja Town' },
                { id: 'jkuat', name: 'JKUAT' },
              ],
            },
          ],
        },
      ],
    },

    // ============================================
    // UGANDA
    // ============================================
    {
      code: 'UG',
      name: 'Uganda',
      phoneCode: '+256',
      counties: [
        {
          id: 'kampala',
          name: 'Kampala',
          constituencies: [
            {
              id: 'central-kampala',
              name: 'Central Division',
              locations: [
                { id: 'kampala-cbd', name: 'Kampala CBD' },
                { id: 'nakasero', name: 'Nakasero' },
                { id: 'kololo', name: 'Kololo' },
              ],
            },
            {
              id: 'kawempe',
              name: 'Kawempe Division',
              locations: [
                { id: 'kawempe', name: 'Kawempe' },
                { id: 'wandegeya', name: 'Wandegeya' },
                { id: 'makerere', name: 'Makerere' },
              ],
            },
            {
              id: 'makindye',
              name: 'Makindye Division',
              locations: [
                { id: 'makindye', name: 'Makindye' },
                { id: 'nsambya', name: 'Nsambya' },
                { id: 'kabalagala', name: 'Kabalagala' },
              ],
            },
            {
              id: 'nakawa',
              name: 'Nakawa Division',
              locations: [
                { id: 'nakawa', name: 'Nakawa' },
                { id: 'ntinda', name: 'Ntinda' },
                { id: 'naguru', name: 'Naguru' },
              ],
            },
          ],
        },
        {
          id: 'wakiso',
          name: 'Wakiso',
          constituencies: [
            {
              id: 'entebbe',
              name: 'Entebbe Municipality',
              locations: [
                { id: 'entebbe-town', name: 'Entebbe Town' },
                { id: 'kitoro', name: 'Kitoro' },
              ],
            },
            {
              id: 'nansana',
              name: 'Nansana Municipality',
              locations: [
                { id: 'nansana', name: 'Nansana' },
                { id: 'nabweru', name: 'Nabweru' },
              ],
            },
          ],
        },
        {
          id: 'jinja',
          name: 'Jinja',
          constituencies: [
            {
              id: 'jinja-central',
              name: 'Jinja Central',
              locations: [
                { id: 'jinja-town', name: 'Jinja Town' },
                { id: 'walukuba', name: 'Walukuba' },
              ],
            },
          ],
        },
        {
          id: 'mbarara',
          name: 'Mbarara',
          constituencies: [
            {
              id: 'mbarara-municipality',
              name: 'Mbarara Municipality',
              locations: [
                { id: 'mbarara-town', name: 'Mbarara Town' },
                { id: 'kakoba', name: 'Kakoba' },
              ],
            },
          ],
        },
      ],
    },

    // ============================================
    // TANZANIA
    // ============================================
    {
      code: 'TZ',
      name: 'Tanzania',
      phoneCode: '+255',
      counties: [
        {
          id: 'dar-es-salaam',
          name: 'Dar es Salaam',
          constituencies: [
            {
              id: 'ilala',
              name: 'Ilala',
              locations: [
                { id: 'kariakoo', name: 'Kariakoo' },
                { id: 'upanga', name: 'Upanga' },
                { id: 'kisutu', name: 'Kisutu' },
              ],
            },
            {
              id: 'kinondoni',
              name: 'Kinondoni',
              locations: [
                { id: 'kinondoni', name: 'Kinondoni' },
                { id: 'mwenge', name: 'Mwenge' },
                { id: 'sinza', name: 'Sinza' },
                { id: 'mikocheni', name: 'Mikocheni' },
                { id: 'masaki', name: 'Masaki' },
              ],
            },
            {
              id: 'temeke',
              name: 'Temeke',
              locations: [
                { id: 'temeke', name: 'Temeke' },
                { id: 'mbagala', name: 'Mbagala' },
              ],
            },
          ],
        },
        {
          id: 'arusha',
          name: 'Arusha',
          constituencies: [
            {
              id: 'arusha-city',
              name: 'Arusha City',
              locations: [
                { id: 'arusha-cbd', name: 'Arusha CBD' },
                { id: 'sakina', name: 'Sakina' },
                { id: 'njiro', name: 'Njiro' },
              ],
            },
          ],
        },
        {
          id: 'mwanza',
          name: 'Mwanza',
          constituencies: [
            {
              id: 'nyamagana',
              name: 'Nyamagana',
              locations: [
                { id: 'mwanza-cbd', name: 'Mwanza CBD' },
                { id: 'pasiansi', name: 'Pasiansi' },
              ],
            },
          ],
        },
        {
          id: 'dodoma',
          name: 'Dodoma',
          constituencies: [
            {
              id: 'dodoma-urban',
              name: 'Dodoma Urban',
              locations: [
                { id: 'dodoma-cbd', name: 'Dodoma CBD' },
                { id: 'area-d', name: 'Area D' },
              ],
            },
          ],
        },
      ],
    },

    // ============================================
    // NIGERIA
    // ============================================
    {
      code: 'NG',
      name: 'Nigeria',
      phoneCode: '+234',
      counties: [
        {
          id: 'lagos',
          name: 'Lagos',
          constituencies: [
            {
              id: 'lagos-island',
              name: 'Lagos Island',
              locations: [
                { id: 'lagos-cbd', name: 'Lagos Island CBD' },
                { id: 'marina', name: 'Marina' },
                { id: 'broad-street', name: 'Broad Street' },
              ],
            },
            {
              id: 'victoria-island',
              name: 'Victoria Island',
              locations: [
                { id: 'vi', name: 'Victoria Island' },
                { id: 'lekki-phase-1', name: 'Lekki Phase 1' },
                { id: 'ikoyi', name: 'Ikoyi' },
              ],
            },
            {
              id: 'ikeja',
              name: 'Ikeja',
              locations: [
                { id: 'ikeja-gra', name: 'Ikeja GRA' },
                { id: 'maryland', name: 'Maryland' },
                { id: 'ogba', name: 'Ogba' },
                { id: 'allen-avenue', name: 'Allen Avenue' },
              ],
            },
            {
              id: 'surulere',
              name: 'Surulere',
              locations: [
                { id: 'surulere', name: 'Surulere' },
                { id: 'yaba', name: 'Yaba' },
                { id: 'gbagada', name: 'Gbagada' },
              ],
            },
            {
              id: 'lekki',
              name: 'Lekki',
              locations: [
                { id: 'lekki', name: 'Lekki' },
                { id: 'ajah', name: 'Ajah' },
                { id: 'sangotedo', name: 'Sangotedo' },
              ],
            },
          ],
        },
        {
          id: 'abuja-fct',
          name: 'Abuja (FCT)',
          constituencies: [
            {
              id: 'abuja-municipal',
              name: 'Abuja Municipal',
              locations: [
                { id: 'central-area', name: 'Central Area' },
                { id: 'garki', name: 'Garki' },
                { id: 'wuse', name: 'Wuse' },
                { id: 'maitama', name: 'Maitama' },
              ],
            },
            {
              id: 'gwagwalada',
              name: 'Gwagwalada',
              locations: [
                { id: 'gwagwalada', name: 'Gwagwalada' },
              ],
            },
          ],
        },
        {
          id: 'rivers',
          name: 'Rivers',
          constituencies: [
            {
              id: 'port-harcourt',
              name: 'Port Harcourt',
              locations: [
                { id: 'ph-cbd', name: 'Port Harcourt CBD' },
                { id: 'gra-ph', name: 'GRA Phase 1' },
                { id: 'trans-amadi', name: 'Trans Amadi' },
              ],
            },
          ],
        },
        {
          id: 'kano',
          name: 'Kano',
          constituencies: [
            {
              id: 'kano-municipal',
              name: 'Kano Municipal',
              locations: [
                { id: 'kano-cbd', name: 'Kano CBD' },
                { id: 'sabon-gari', name: 'Sabon Gari' },
              ],
            },
          ],
        },
      ],
    },

    // ============================================
    // SOUTH AFRICA
    // ============================================
    {
      code: 'ZA',
      name: 'South Africa',
      phoneCode: '+27',
      counties: [
        {
          id: 'gauteng',
          name: 'Gauteng',
          constituencies: [
            {
              id: 'johannesburg',
              name: 'City of Johannesburg',
              locations: [
                { id: 'sandton', name: 'Sandton' },
                { id: 'rosebank', name: 'Rosebank' },
                { id: 'johannesburg-cbd', name: 'Johannesburg CBD' },
                { id: 'fourways', name: 'Fourways' },
                { id: 'midrand', name: 'Midrand' },
              ],
            },
            {
              id: 'pretoria',
              name: 'City of Tshwane (Pretoria)',
              locations: [
                { id: 'pretoria-cbd', name: 'Pretoria CBD' },
                { id: 'hatfield', name: 'Hatfield' },
                { id: 'centurion', name: 'Centurion' },
                { id: 'menlyn', name: 'Menlyn' },
              ],
            },
            {
              id: 'ekurhuleni',
              name: 'Ekurhuleni',
              locations: [
                { id: 'germiston', name: 'Germiston' },
                { id: 'boksburg', name: 'Boksburg' },
                { id: 'bedfordview', name: 'Bedfordview' },
              ],
            },
          ],
        },
        {
          id: 'western-cape',
          name: 'Western Cape',
          constituencies: [
            {
              id: 'cape-town',
              name: 'City of Cape Town',
              locations: [
                { id: 'cape-town-cbd', name: 'Cape Town CBD' },
                { id: 'waterfront', name: 'V&A Waterfront' },
                { id: 'sea-point', name: 'Sea Point' },
                { id: 'claremont', name: 'Claremont' },
                { id: 'bellville', name: 'Bellville' },
              ],
            },
          ],
        },
        {
          id: 'kwazulu-natal',
          name: 'KwaZulu-Natal',
          constituencies: [
            {
              id: 'durban',
              name: 'eThekwini (Durban)',
              locations: [
                { id: 'durban-cbd', name: 'Durban CBD' },
                { id: 'umhlanga', name: 'Umhlanga' },
                { id: 'ballito', name: 'Ballito' },
                { id: 'durban-north', name: 'Durban North' },
              ],
            },
          ],
        },
      ],
    },

    // ============================================
    // RWANDA
    // ============================================
    {
      code: 'RW',
      name: 'Rwanda',
      phoneCode: '+250',
      counties: [
        {
          id: 'kigali',
          name: 'Kigali',
          constituencies: [
            {
              id: 'nyarugenge',
              name: 'Nyarugenge',
              locations: [
                { id: 'kigali-cbd', name: 'Kigali CBD' },
                { id: 'nyamirambo', name: 'Nyamirambo' },
                { id: 'kimisagara', name: 'Kimisagara' },
              ],
            },
            {
              id: 'gasabo',
              name: 'Gasabo',
              locations: [
                { id: 'kimihurura', name: 'Kimihurura' },
                { id: 'remera', name: 'Remera' },
                { id: 'gisozi', name: 'Gisozi' },
                { id: 'kacyiru', name: 'Kacyiru' },
              ],
            },
            {
              id: 'kicukiro',
              name: 'Kicukiro',
              locations: [
                { id: 'kicukiro', name: 'Kicukiro' },
                { id: 'niboye', name: 'Niboye' },
                { id: 'kanombe', name: 'Kanombe' },
              ],
            },
          ],
        },
        {
          id: 'eastern-province',
          name: 'Eastern Province',
          constituencies: [
            {
              id: 'rwamagana',
              name: 'Rwamagana',
              locations: [
                { id: 'rwamagana-town', name: 'Rwamagana Town' },
              ],
            },
          ],
        },
        {
          id: 'western-province',
          name: 'Western Province',
          constituencies: [
            {
              id: 'rubavu',
              name: 'Rubavu',
              locations: [
                { id: 'gisenyi', name: 'Gisenyi' },
              ],
            },
          ],
        },
      ],
    },
  ]);

  selectedCountry = signal<Country | null>(null);

  getCountries = computed(() => this.countries());

  constructor() {
    this.detectCountry();
  }

  detectCountry(): void {
    const kenya = this.countries().find((c) => c.code === 'KE');
    if (kenya) {
      this.selectedCountry.set(kenya);
    }
  }

  getCountiesByCountry(countryCode: string): County[] {
    const country = this.countries().find((c) => c.code === countryCode);
    return country?.counties ?? [];
  }

  getConstituenciesByCounty(countryCode: string, countyId: string): Constituency[] {
    const counties = this.getCountiesByCountry(countryCode);
    const county = counties.find((c) => c.id === countyId);
    return county?.constituencies ?? [];
  }

  getLocationsByConstituency(
    countryCode: string,
    countyId: string,
    constituencyId: string
  ): Location[] {
    const constituencies = this.getConstituenciesByCounty(countryCode, countyId);
    const constituency = constituencies.find((c) => c.id === constituencyId);
    return constituency?.locations ?? [];
  }

  getCountryByCode(code: string): Country | undefined {
    return this.countries().find((c) => c.code === code);
  }
}
