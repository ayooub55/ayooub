/* ------------------------------------------------------------------
   S1 — 1ère année Médecine Dentaire · FMDC Casablanca
   Arborescence du Drive « S1 » : https://drive.google.com/drive/folders/1jljGDmCqvwKDAiS-Fa3a1L_I5eqgJkxK
   Chaque entrée = un dossier du Drive ; [nom, id] = un fichier.
   Les dossiers sans fichiers (encore vides sur le Drive) sont marqués vide: true.
   ------------------------------------------------------------------ */

window.S1 = {
  meta: {
    titre: 'S1 — Espace de révision',
    sousTitre: '1ère année · Faculté de Médecine Dentaire de Casablanca',
    faculte: 'Université Hassan II — Casablanca',
    slot: 'Semestre 1',
    driveId: '1jljGDmCqvwKDAiS-Fa3a1L_I5eqgJkxK',
    driveUrl: 'https://drive.google.com/drive/folders/1jljGDmCqvwKDAiS-Fa3a1L_I5eqgJkxK',
    maj: 'Mis à jour en continu depuis le Drive de la promo'
  },

  /* Fichiers à la racine du Drive (hors modules) */
  racine: [
    { nom: 'Modules de Formation.pdf', id: '1lbMVuAioZ6O2pDHeSLIsMzdxLAm3aToc', note: 'PDF · 119 Ko' }
  ],

  modules: [
    /* ---------------------------------------------------------- 1 */
    {
      id: 'anatomie',
      nom: 'Anatomie & Physiologie',
      court: 'Anatomie & Physio',
      emoji: '🫀',
      couleur: '#ef4d63',
      folder: '1oF0dIaoORejhszkXCZyK8RvqB0y2HBzk',
      desc: 'Anatomie générale (Pr. Debbagh, Erreguibi, Idelhaj) et physiologie (Pr. Sabry).',
      enfants: [
        { nom: 'Anatomie Générale', folder: '16e7rC-bGY0fOSQhMqTW_-Myb8ouUIKCz', enfants: [
          { nom: 'Pr. Debbagh', folder: '1lBhhrcdYtupQz6zudhyUIdg_sJ_YqEcp', vide: true },
          { nom: 'Pr. Erreguibi', folder: '1ybPgUn5qE4U52kO7mLCZ2-CGaKL8txgh', vide: true },
          { nom: 'Pr. Idelhaj', folder: '1xcbBYqm0vRnI6VXZhp7qZP0BhDRwuKFt', vide: true },
          { nom: 'Résumé', folder: '1JUsHf1IHnHls67WnpdW-t6CZ7Ot2tcPU', vide: true },
          { nom: 'Annales / QCM', folder: '1U1VheI79kfvSmeZZNCrftAD86K-2lT-i', vide: true }
        ]},
        { nom: 'Physiologie', folder: '1nFaXEmstMmMh96UJyuznAaWYhTbHroBG', enfants: [
          { nom: 'Pr. Sabry', folder: '17whVSdYuIJeZ3MgxvMsymFfN5jOWyXCy', enfants: [
            { nom: 'Cours', folder: '1K8Y_hWiPaDojwOIwbtbKdlOdnyUecEZ8', vide: true },
            { nom: 'Annales', folder: '1O9Ds4Nv26JHEcjdbK-tEuoS_nOpqDgeG', vide: true },
            { nom: 'Résumé', folder: '1B7WGKLWtKWEiupW336Dlx_aj4T-ZoTzB', fichiers: [
              { nom: 'resume_systeme_digestif.pdf', id: '1XH0C2tWu5tVazpsbDZl9t3ZMNFkpwwwC' },
              { nom: 'Résumé neuro.pdf', id: '15XRjGOm5p4HwcmDYR3uvtMm56rSAg9lf' }
            ]}
          ]}
        ]}
      ]
    },

    /* ---------------------------------------------------------- 2 */
    {
      id: 'biologie',
      nom: 'Biologie cellulaire, moléculaire & génétique',
      court: 'Biologie',
      emoji: '🧬',
      couleur: '#22b07d',
      folder: '1bzklWqSZ0h83zH9lnjBz8QOHTKWTa5p8',
      desc: 'Cours de biologie cellulaire (Pr. Rhrich), biologie moléculaire (Pr. Rochd) et une banque de QCM.',
      enfants: [
        { nom: 'Biologie Cellulaire', folder: '1aLNyQyeaA44Fw5prTnz4SrXbX3X0oOGy', enfants: [
          { nom: 'Pr. Rhrich', folder: '1TWUZrFHiNaeCg-NJSTKquoy5wkU7LnYg', fichiers: [
            { nom: "Méthodes d'étude de la cellule.pdf", id: '12C2EZRNXC-nMexHNobPSpy3Sn6dSqz9k' },
            { nom: 'Première partie Membrane plasmique.pdf', id: '1QNX_DvCQ_9gqGmoPpFzOqLSYlutXFEij' },
            { nom: 'Deuxième partie Membrane plasmique.pdf', id: '1NWvkqQppKU2cpYUXe80LZ9iFMzCHpGPo' }
          ]}
        ]},
        { nom: 'Biologie Moléculaire & Génétique', folder: '17-WqfZopOnWKdjrUtI5GG5Nlgu2UBTRy', enfants: [
          { nom: 'Pr. Rochd', folder: '1H9DuUBguDhJYHXPMrn3ulLtmr2iisf23', fichiers: [
            { nom: 'Poly BioMol Pr ROCHD.pdf', id: '1y_Z_TorkYh4vybrDq-NfqklOAEgZWoIc' }
          ]}
        ]},
        { nom: 'QCM & annales', folder: '1hz1WPr1IyCvafTdq6wbS-u1q98-Vpo6b', fichiers: [
          { nom: 'Biocell 2020.pdf', id: '1a_kTarVczyqt_FLVo68LsgJePKc9RXyb' },
          { nom: 'Biocell Ratt 2020.pdf', id: '1KX8ynPRZvqeMESsJKm3sL_AXW1iGbsGI' },
          { nom: 'BIOLOGIE 2022.pdf', id: '1gwNcCyfy53iOAVr5GGIoZnO7sDrpHJe5' },
          { nom: 'BIOLOGIE 2023.pdf', id: '1xENwhGfgi9afQZ9F4NXUwOrvjXMBzSEQ' },
          { nom: 'Biologie exam 2025.pdf', id: '1ulxvbsrkO3KuQjaXFX5oS3E0F9in7IFl' },
          { nom: 'Biologie moléculaire-génétique 2023.pdf', id: '1CVhRlSWs4DwYbGuzTRDIFda61o_dWT3g' },
          { nom: 'Correction QCM ZAIM exam 2025.pdf', id: '1pAS8SgHPF2bvR7afZN3_m42Bjhyz6gEw' },
          { nom: 'QCM BIOLOGIE.pdf', id: '1g4LiIFOz0jzoz_mPyNQ8gvQ7__1IdRtc' },
          { nom: 'QCM Rochd + Dehbi.pdf', id: '1f5v8pPt9Saofel3G3JfYKMqnoHT18h5r' },
          { nom: 'Zaim QCM.pdf', id: '1ESFAuFBciZ1T_yjSej9ViESi6bpo57Q1' }
        ]}
      ]
    },

    /* ---------------------------------------------------------- 3 */
    {
      id: 'biophysique',
      nom: 'Biophysique & Sciences des matériaux',
      court: 'Biophysique',
      emoji: '⚛️',
      couleur: '#7c5cff',
      folder: '1qphThy4Ijo6gRqO3mE1_S55-_FH4W20a',
      desc: 'Cours, résumés et exercices — Pr. Bouzoubaa, El Boussiri, Guensi et Khalil El Guermai.',
      enfants: [
        { nom: 'Biophysique', folder: '1Z0xJr6BIgtQmNMDe9gWJHjszL8Qadv3s', enfants: [
          { nom: 'Pr. Bouzoubaa', folder: '1bDP3B7hGkYmxL6dK_udNNC4rqTAt6l_p', enfants: [
            { nom: 'Cours', folder: '1OWf90LF1M4IL3ZUQfJ2q0eUCSF_E-xNj', fichiers: [
              { nom: 'biopc.pdf', id: '1AH0mLhLm0UB1zkc-brafWzA_u-lL3e4Z' }
            ]}
          ]},
          { nom: 'Pr. El Boussiri', folder: '13FiwVQZxne94-XDLhq-ftryNExNbiwsn', enfants: [
            { nom: 'Cours', folder: '1oGXdFMAZyhHxVZP3proCKjtpdgFG5xxH', fichiers: [
              { nom: 'Ultrasons CM (1).pdf', id: '1eNxDaeZAscZUHiDRru7sHEFkYCeXSd8e' }
            ]},
            { nom: 'Résumé', folder: '1a8bgHOlgvyTPuXU3ur2mbp6ADg4omYJq', fichiers: [
              { nom: 'Biophy Boussiri + cubes (1).pdf', id: '1PzBAUFLa-6Sbfb_scLB8Vl_24FKSHcYU' }
            ]}
          ]},
          { nom: 'Pr. Guensi', folder: '1ON0ioctldzSqOXSaEb97xXO8CAu4agYA', vide: true },
          { nom: 'Pr. Khalil El Guermai', folder: '1fDPP46UtPciUKgnTBQeHGqGqfXhjwsgn', enfants: [
            { nom: 'Cours', folder: '1u30n9cts9mhtAuawk_Bmm_x2diAztGIt', fichiers: [
              { nom: 'Cours 2026-2027 — Biophysique & Science de la Matière (1ère année).pdf', id: '1oW1oP0-MJBnAXnQ-C6b5xsC966hj965a' },
              { nom: 'Interactions des rayonnements ionisants avec la matière.pdf', id: '1DlDgBgBhtaXSjcOXSqzJuT0U9LFgxzA8' }
            ]},
            { nom: 'QCM / Exercices', folder: '1awEwD6r0_LSvPHo7EXdcaOCmdlS7vKLs', fichiers: [
              { nom: 'DOC-20260911-WA0015.pdf', id: '1r1oou6yk1XHdiZ7hgQWEV4-ADOguE_os' },
              { nom: 'Examens & Exercices Sciences de la Matière — 1ère année FMDC.pdf', id: '1uUwnpfKht4cVefyzDPebh3hUQiB_FQnT' }
            ]},
            { nom: 'Résumé', folder: '1rhLVOgScr-5uUiUnNqzlFEok_niazu2E', vide: true }
          ]}
        ]},
        { nom: 'Sciences des Matériaux', folder: '1KySOdFqbkeDCNSEPfaormvH9Bhb1hXEn', enfants: [
          { nom: 'Pr. Boussiri', folder: '1BZyCg-xLF_s7jD4mnKwMwzHpDWyMHJtH', vide: true },
          { nom: 'Pr. Guermai', folder: '1cEaBnU8fbAHsP_9BVTWHzcJ7hBzMjAVN', vide: true },
          { nom: 'QCM / Exercices', folder: '1ZrO6I7VA2ZE5Rzzy0nrcwWQHw97jBV8O', fichiers: [
            { nom: 'Examens & Exercices Sciences de la Matière — 1ère année FMDC.pdf', id: '1dlfhFd4FGGSxgHk-qS4cNqbd7Uf2PWIU' }
          ]}
        ]},
        { nom: 'Annales', folder: '13djeO96rZ-9ZuzLyVJjqiOYTGj_TDBSm', fichiers: [
          { nom: 'EXAM 2025.pdf', id: '17BXV0hmj47p546DyZIOf55GxFJB82jDd' },
          { nom: 'exam 2025.pdf', id: '19fEj0e7eNHN6Olv9h7-Z7ebUKbPJjV6B' },
          { nom: 'qcm biophysique.pdf', id: '1Dl8KCIGF4xEeAnxyCvGIAgv0uPtXbtY9' }
        ]},
        { nom: 'Résumés du module', folder: '1j97yQ4hz5oKN54VkikHqpa7ClkxXkjHO', fichiers: [
          { nom: 'Biophysique & Sc. des Matériaux — Pr. Guermai, Boussiri, Bouzoubaa.pdf', id: '1V8Ed6S6SDASU714hUgcUeVnuuY2XL5hP' },
          { nom: 'Photo.pdf', id: '1aFIgNMruG9a6R6qhs_s2kw9k7cJWRHb5' }
        ]}
      ]
    },

    /* ---------------------------------------------------------- 4 */
    {
      id: 'chimie',
      nom: 'Chimie & Biochimie structurale',
      court: 'Chimie & Biochimie',
      emoji: '🧪',
      couleur: '#f0921f',
      folder: '1jegFRSCdklpmMY4Z9vD9hLUDO7UxyBWF',
      desc: 'Chimie générale (Pr. Gueddari), chimie organique, biochimie structurale (Pr. Khlil, Naamane).',
      enfants: [
        { nom: 'Biochimie Structurale', folder: '1r-hgLiJmBjV1k2zDlLtZD8ng1H5AMUT0', enfants: [
          { nom: 'Pr. Khlil', folder: '1EMTXlJ7JKOW87TaJ3oL4k1r6s6pt__mY', enfants: [
            { nom: 'Cours', folder: '1CnEIzzrXVuYyir5JKkJ5GyeUo9MBKsmP', vide: true },
            { nom: 'CDM / Annales', folder: '1YfbZy5-IIL9ZYQXo9bY-hT-K9hF8ZE-7', vide: true },
            { nom: 'Résumés', folder: '1hT7xpgijIlmltsNVzKw7ycoaTuUwfBdj', vide: true }
          ]},
          { nom: 'Pr. Naamane', folder: '1MNqaX2k7-ghT0_UeulqUE1nNfjzQKu4Q', enfants: [
            { nom: 'Cours', folder: '12oiG-luOVopRPcFKyO91L8OFNY1b6Tt6', vide: true },
            { nom: 'QCM', folder: '1h4M_d1pJcXMNogODeiqJqbLYIlgzB3VA', vide: true },
            { nom: 'Résumé', folder: '16qXvMIpwTfTgUQU1k1lY31FJUj0meikl', fichiers: [
              { nom: 'Biochimie-Structurale-Glucides.pdf', id: '1a-HsfOTiDg24d2AajJmlBVGjVlcY_aAS' },
              { nom: 'Glucides — CADEMEP.pdf', id: '1wBXjpfFvzbgCrLk4_clCizCYPbTEOsuv' }
            ]}
          ]}
        ]},
        { nom: 'Chimie Générale', folder: '12XQp3WpId5CvluA0ZyuyKnGoD6Vvwxi5', enfants: [
          { nom: 'Pr. Gueddari', folder: '1J5j2aCEqPZIP2CiXpsWbfrSOtJ8as7IE', fichiers: [
            { nom: 'Cours Chimie Générale.pdf', id: '1RHP6JkR0UpPwvzDD5lekeGE_zfvNUB8e' }
          ]}
        ]},
        { nom: 'Chimie Organique', folder: '1Hbb3mZXuC4ZIelR6xoatI9YX7ReRzEm0', fichiers: [
          { nom: 'Cours Chimie Organique.pdf', id: '1MEor0A8rwdSBMhBI0dU0HpwgKQY1jaCz' }
        ]},
        { nom: 'QCM / Révision / Examens', folder: '1NLYb5UyGKS7Eop3RjVLFWuI5F7_OF5Cz', vide: true }
      ]
    },

    /* ---------------------------------------------------------- 5 */
    {
      id: 'imd',
      nom: 'Initiation à la Médecine Dentaire',
      court: 'IMD',
      emoji: '🦷',
      couleur: '#12a5d8',
      folder: '12lZb0pal4yKUm8sj9TTGCnrjxopKpIek',
      desc: 'Cours des Pr. Badre et Bensouda, banque de QCM et supports de TP.',
      enfants: [
        { nom: 'Pr. Badre', folder: '1AgtVFSHGW1OimZ_vIiNUu5OtNAccYcSi', fichiers: [
          { nom: 'Introduction aux Pathologies bucco-dentaires.pdf', id: '1WKZzJ9FJPtX-IeFVvUFmMZQenQyhk6Bg' },
          { nom: 'La carie.pdf', id: '1ouCIieH-hIs1Bnmf3QNc7jvtiBcU2oRT' },
          { nom: 'Les Parodontopathies.pdf', id: '18XWrKA_4R_-ubW0Ptx8zw0LL9lHihAMz' },
          { nom: "Malocclusion chez l'enfant.pdf", id: '1I09lAKRZh88XihWEIkffblySaAtK3nMq' },
          { nom: 'Prévention B_D.pdf', id: '19r3mPi1njb7XrJjYBJrL2gjWib0u0X5i' }
        ]},
        { nom: 'Pr. Bensouda', folder: '1AjEnUpZc5rNWDdp6kQeyqICWbJPlRKxy', fichiers: [
          { nom: 'Cavité buccale 2026.pdf', id: '11HS-qnysvuNK2NUjN1HfdZT0BmNJ7zIK' },
          { nom: 'IMD INTRO 26-27.pdf', id: '1b3XGgACdCuwbyhDyAXtvIhDJ9lrXe1RN' },
          { nom: 'Incisive permanente 2027.pdf', id: '1yw8IY9P-y1Rcz2E4yrtuPZZOo1R0mhu5' },
          { nom: 'Nomenclature et 2026 DV.pdf', id: '1hn4P-fnDG-6c_puaTcTItOflXa4Aq1XJ' },
          { nom: 'Organe dentaire 2026.pdf', id: '1bwNX6V6WgMo8fdLKedskKlfhc-yRFk9T' }
        ]},
        { nom: 'QCM', folder: '1pKhLvSCOjNvmZsVKG0MBe6L8aElda4hf', fichiers: [
          { nom: 'IMD 2024-2025.pdf', id: '1vHGK-YdbbqwMfj7vC-MNxJnr4hOUA7tL' },
          { nom: 'IMD Exams modifié.pdf', id: '100HKeQjTQAAx3QA4CPMm1JzQOGzFqjJT' },
          { nom: 'QCM IMD jaune.pdf', id: '1uSsEVTK9Ha7f4t13J-RENc2_MRJLSaSJ' }
        ]},
        { nom: 'TP', folder: '15dD7oAnPLVg7UdWXf33Fdx2ndtbIgMPD', fichiers: [
          { nom: "L'instrumentation 2026 (version finale).pptx", id: '1xaHCHw24XpFlV73LWTXWpUglf3WPmCxt', type: 'pptx' },
          { nom: 'Liste de matériel TP.pdf', id: '1PQkeK0ZVVavd5QWalh4VYKBb9vk1jPpu' }
        ]},
        { nom: 'Pr. Bouzoubaa', folder: '19PfaebsOMt5esj0K3y0h4UaGGo5okRIx', vide: true }
      ]
    },

    /* ---------------------------------------------------------- 6 */
    {
      id: 'exams-2025',
      nom: 'Examens 2025-2026',
      court: 'Examens 2025',
      emoji: '📝',
      couleur: '#d64550',
      folder: '1GEwa9Fh6HAxdGHp56stpKOMXjoKDtTgf',
      desc: 'Les sujets d’examens du S1 : anatomie, biochimie, biologie, chimie et physiologie.',
      enfants: [
        { nom: 'Exams 2025', folder: '1aOrrJ43G1bc7whPXh3tbWcFRWJz3_Pcr', fichiers: [
          { nom: 'Anatomie N2026.pdf', id: '1v7QEwax7D5HvlkQXgT4Nqqi9wkBRz7ei' },
          { nom: 'Biochimie N2026.pdf', id: '1oEQtaMnfjW9H5oh6-sDYj0VroK2xrLzm' },
          { nom: 'Biologie N2026.pdf', id: '1SYwUvQ5_gmH_HGzgLtmAD4bIMU-4goIm' },
          { nom: 'Chimie N2026.pdf', id: '1JQEPx1mJ_3E0zphPswQsEKiF6NqwUOUm' },
          { nom: 'Physiologie N2026.pdf', id: '1VVq7m1twEQzQNXzChaOmgcAnZoNEHzmp' }
        ]}
      ]
    },

    /* ---------------------------------------------------------- 7 */
    {
      id: 'examens-anciens',
      nom: 'Examens des années précédentes',
      court: 'Annales S1',
      emoji: '🗂️',
      couleur: '#a06cd5',
      folder: '1teAFJ6je5K-0Z7ibagoVVz1ZA9rgoXEG',
      desc: 'Sujets complets du S1 des promotions précédentes (2023 et 2024).',
      enfants: [
        { nom: 'Session 2023', folder: '1AdXc7IoP92kFQW5TUBgYMUZ_OaomAXRw', fichiers: [
          { nom: 'EXAMS S1 2023.pdf', id: '18xRA5bIQR7qVV3GHP943-Y6z3q94BxTQ' }
        ]},
        { nom: 'Session 2024', folder: '1EpryFWJILSV0eAA41-LUo0zPA2zSNrgX', fichiers: [
          { nom: 'EXAMS S1 2024.pdf', id: '1VNtsDk4MocfJiZ7YtRGkyxlvdokmzA5M' }
        ]}
      ]
    },

    /* ---------------------------------------------------------- 8 */
    {
      id: 'autres-facs',
      nom: 'QCM des autres facultés',
      court: 'Autres facs',
      emoji: '🏛️',
      couleur: '#14b8a6',
      folder: '1I1Xlwa39AYyHOP1mkYU-6RT_W0Vlsc_G',
      desc: 'Banques de QCM et examens d’initiation venant de la FMDR, UIASS, UIR et UPM.',
      enfants: [
        { nom: 'FMDR', folder: '1y2FVP6cF8_gcQ1g2ToI0kYxPKLuTkmh8', fichiers: [
          { nom: 'WhatsApp Image 2020-06-19 à 21.07.26.jpeg', id: '10WQfWmWpNLLuHw1kveBX-ho-QY6gJb0W', type: 'image' }
        ]},
        { nom: 'UIASS', folder: '1YzG32ZcscvWb1WvO6rliJNEPaSPVUtol', fichiers: [
          { nom: 'Banque des QCM UIASS.pdf', id: '19fkhHsGQNwik6r1vJKloPd-vWFNVxt96' },
          { nom: 'Réponses banque.pdf', id: '1A6qNJd2WFAMsTUzgMqzR32-h0u1X2ApL' },
          { nom: 'WhatsApp Image 2020-06-19 à 21.10.27 (2).jpeg', id: '1Y8mzS8WboaSF2u-X1o6f9QK87zcUVLG7', type: 'image' }
        ]},
        { nom: 'UIR', folder: '1NwiDggOr59vDSqEmC7LVRLfDJZIGVBjM', fichiers: [
          { nom: 'Examen Initiation — Juil 20.pdf', id: '1JkXiGFVFTMnXWkbCP2gsooIE3HpPMCs6' },
          { nom: 'WhatsApp Image 2020-06-19 à 21.07.37.jpeg', id: '1ZFI1h4SIo8XKrldPfTCTGxvUhJmtkTvB', type: 'image' }
        ]},
        { nom: 'UPM', folder: '1p50QU3Y9BTjPIXUXH19A8HsplaNp2OCo', fichiers: [
          { nom: 'CC Initiation.pdf', id: '1PIxJGxaqLH32hk1huqYaCb7LgKdKaiEh' },
          { nom: 'Contrôle Initiation Médecine Dentaire (scan).pdf', id: '17ovEafZ3xpNJocrjCXgoyj7uzxAIa2gk' },
          { nom: 'DEN1 — Initiation à la Médecine Dentaire.pdf', id: '1yqyP9sYPJSQ67f4d3wUJD0lytiYyx0Bu' },
          { nom: 'Épreuve IMD — Mai 24.pdf', id: '14CGzObpXu89d0dpeVP7Z1YQwbxCC9hCk' },
          { nom: 'QCM Initiation.pdf', id: '1rJEUNY2sW7j8i-xC71jsNd65B3Cshmcg' },
          { nom: 'QCM dentaire — questions 1 à 27 (scan).pdf', id: '1MWUYeJMXZMzpX4dKT40pttHSmz_feqnN' },
          { nom: 'QCM Initiation Médecine Dentaire 2020-2021 (scan).pdf', id: '1eiYzL-m-2deOwTjVBnaDynBqW94Mfo3u' }
        ]}
      ]
    },

    /* ---------------------------------------------------------- 9 */
    {
      id: 'mtu',
      nom: 'Méthodologie du travail universitaire',
      court: 'MTU',
      emoji: '🧭',
      couleur: '#8b8fa3',
      folder: '16cQrP6c-g6gc5gLgxyCd8xuBG8lC6sDf',
      desc: 'Pr. Mouhibi et Pr. Sabri — dossier en cours de remplissage sur le Drive.',
      enfants: [
        { nom: 'Pr. Mouhibi', folder: '1FWxwnzwOHjgfCu-1egzWCY3n7wKCLlZD', vide: true },
        { nom: 'Pr. Sabri', folder: '1_soa9aOFGFbP8SuNsQGh8fGhyahqgWu1', vide: true },
        { nom: 'Annales', folder: '1PclSrX1XqLD7pE94DJka17Ksi6nDRVKH', vide: true }
      ]
    }
  ]
};
