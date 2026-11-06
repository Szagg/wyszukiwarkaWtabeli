
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    
    const pracownicy = [
        { id: 1, imie: "Jan", nazwisko: "Kowalski", dzial: "IT", pensja: 6500 },
        { id: 2, imie: "Anna", nazwisko: "Nowak", dzial: "Sprzedaż", pensja: 5200 },
        { id: 3, imie: "Piotr", nazwisko: "Wiśniewski", dzial: "IT", pensja: 7200 },
        { id: 4, imie: "Maria", nazwisko: "Wójcik", dzial: "Księgowość", pensja: 5800 },
        { id: 5, imie: "Tomasz", nazwisko: "Kowalczyk", dzial: "IT", pensja: 6800 },
        { id: 6, imie: "Katarzyna", nazwisko: "Kamińska", dzial: "Sprzedaż", pensja: 4900 },
        { id: 7, imie: "Michał", nazwisko: "Lewandowski", dzial: "Księgowość", pensja: 6100 },
        { id: 8, imie: "Agnieszka", nazwisko: "Zielińska", dzial: "IT", pensja: 7500 },
        { id: 9, imie: "Paweł", nazwisko: "Szymański", dzial: "Sprzedaż", pensja: 5300 },
        { id: 10, imie: "Ewa", nazwisko: "Woźniak", dzial: "IT", pensja: 7000 },
        { id: 11, imie: "Adam", nazwisko: "Dąbrowski", dzial: "Księgowość", pensja: 5600 },
        { id: 12, imie: "Monika", nazwisko: "Kozłowska", dzial: "Sprzedaż", pensja: 5100 }
    ];

    const [fraza, setFraza] = useState("");
    const [dzial, setDzial] = useState("");
   
    const przefiltrowaniPracownicy = pracownicy.filter((pracownik) => {
        const szukanyTekst = fraza.trim().toLowerCase();
        const nazwisko = pracownik.nazwisko.toLowerCase();
        const pasujeNazwisko = nazwisko.includes(szukanyTekst);
        const pasujeDzial = dzial === "" || pracownik.dzial === dzial;

        return pasujeNazwisko && pasujeDzial;
    });
    const obsluzWyszukiwanie = (e) => {
        setFraza(e.target.value);

        const tekst = e.target.value.trim().toLowerCase();

        const wyniki = pracownicy.filter((pracownik) => {
            const pasujeNazwisko = pracownik.nazwisko
                .toLowerCase()
                .includes(tekst);

            const pasujeDzial =
                dzial === "" || pracownik.dzial === dzial;

            return pasujeNazwisko && pasujeDzial;
        });

          console.log("Wyniki: " + wyniki.length);
                    };

   
    const obsluzZmianeDzialu = (e) => {
        setDzial(e.target.value);
        const wybranyDzial = e.target.value;
        const tekst = fraza.trim().toLowerCase();

        const wyniki = pracownicy.filter((pracownik) => {
            const pasujeNazwisko = pracownik.nazwisko
                .toLowerCase()
                .includes(tekst);
            const pasujeDzial =
                wybranyDzial === "" || pracownik.dzial === wybranyDzial;

            return pasujeNazwisko && pasujeDzial;
                      });

        console.log("Wyniki: " + wyniki.length);
    };
    return (
        <div className="container mt-4">
            <h2>Pracownicy</h2>
            <div className="row mt-3 mb-3">
                <div className="col-md-6">
                    <label htmlFor="wyszukiwanie" className="form-label">
                        Szukaj:
                    </label>
                 <input
                        type="text"
                        id="wyszukiwanie"
                        className="form-control"
                        value={fraza}
                        onChange={obsluzWyszukiwanie}/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="wyborDzialu" className="form-label">
                        Dział:
                    </label>
                    <select
                        id="wyborDzialu"
                        className="form-select"
                        value={dzial}
                        onChange={obsluzZmianeDzialu}
                    >
                        <option value="">Wszystkie</option>
                        <option value="IT">IT</option>
                        <option value="Sprzedaż">Sprzedaż</option>
                        <option value="Księgowość">Księgowość</option>
                    </select>
                </div>
              </div>
            <p>
                <b>Liczba pracowników: {przefiltrowaniPracownicy.length}</b>
            </p>

            {przefiltrowaniPracownicy.length > 0 ? (
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Dział</th>
                            <th>Pensja</th>
                        </tr>
                    </thead>

                    <tbody>
                    {przefiltrowaniPracownicy.map((pracownik) => (
                            <tr key={pracownik.id}>
                                <td>{pracownik.imie}</td>
                                <td>{pracownik.nazwisko}</td>
                                <td>{pracownik.dzial}</td>
                                <td>{pracownik.pensja}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-warning">
                    Brak pracowników spełniających kryteria
                </div>
            )}
        </div>
    );
}

export default App;
