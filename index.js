const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */
const final2014 = fifaData.filter((year) => { return year.Year == 2014 && year.Stage == "Final"; });

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
//console.log(final2014[0]["Home Team Name"]);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
//console.log(final2014[0]["Away Team Name"]);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
//console.log(final2014[0]["Home Team Goals"]);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
//console.log(final2014[0]["Away Team Goals"]);

//(e) 2014 Dünya kupası finali kazananı*/
//console.log(final2014[0]["Win conditions"]);

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(baseData) {

	const finalMaches = baseData.filter((finals) => { return finals.Stage == 'Final'; });

	return finalMaches;
}

//console.log(Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(baseData, getFinals) {

	const finalMaches = getFinals(baseData);
	const years = finalMaches.map((year) => { return year.Year });
	return years;
}
//console.log(Yillar(fifaData,Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(baseData, getFinals) {

	const finalMaches = getFinals(baseData);

	/* function winner(item) {
		if (item["Home Team Goals"] > item["Away Team Goals"]) {
			return item["Home Team Name"]
		}
		else {
			return item["Away Team Name"];
		}
	}
	const winners = finalMaches.map(winner); */

	const winners = finalMaches.map((item) => {
		return (item["Home Team Goals"] > item["Away Team Goals"])
			? item["Home Team Name"] : item["Away Team Name"];
	});
	return winners;
}

//console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(baseData, getFinals, getTournamentYears, getWinners) {

	const years = getTournamentYears(baseData, getFinals);
	const winners = getWinners(baseData, getFinals);

	const result = [];

	for (let i = 0; i < years.length; i++) {
		result.push(`${years[i]} yılında, ${winners[i]} dünya kupasını kazandı!`);
	}
	return result;
}

//console.log(YillaraGoreKazananlar(fifaData,Finaller,Yillar,Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(getFinals) {

	const finalMaches = getFinals;

	const goalAvarage = (finalMaches.reduce((total, goal) => {
		return total + goal["Away Team Goals"] + goal["Home Team Goals"];
	}, 0) / finalMaches.length).toFixed(2);

	return goalAvarage;
}
//console.log(OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(baseData, teamInıtials) {

	const finalMaches = Finaller(baseData);

	/* function winner(item) {
		if (item["Home Team Goals"] > item["Away Team Goals"]) {
			return item["Home Team Initials"]
		}
		else {
			return item["Away Team Initials"];
		}
	}
	const winners = finalMaches.map(winner); */

	const winners = finalMaches.map((item) => {
		return (item["Home Team Goals"] > item["Away Team Goals"])
			? item["Home Team Initials"] : item["Away Team Initials"];
	});

	return winners.reduce((total, init) => { return total + Number(init === teamInıtials) }, 0);
}

//console.log(UlkelerinKazanmaSayilari(fifaData, "BRA"));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(baseData) {

	const finalMaches = Finaller(baseData);

	const homeNameGoals = finalMaches.map((team) => { return { "Name": team["Home Team Name"], "Goal": team["Home Team Goals"] }; });
	const awayNameGoals = finalMaches.map((team) => { return { "Name": team["Away Team Name"], "Goal": team["Away Team Goals"] }; });

	const nameGoals = [...homeNameGoals, ...awayNameGoals];

	const teamNames = Array.from(new Set(nameGoals.map((team) => { return team["Name"] })));
	const totalTeamGoals = [];

	for (let n = 0; n < teamNames.length; n++) {
		let goalCount = 0;

		for (let i = 0; i < nameGoals.length; i++) {

			if (teamNames[n] === nameGoals[i]["Name"]) {
				goalCount += nameGoals[i]["Goal"];
			}
		}

		totalTeamGoals.push({
			"Name": teamNames[n],
			"Goal": goalCount
		});
	}

	const bestTeam = totalTeamGoals.reduce((top, team) => { return team.Goal > top.Goal ? team : top; })

	return bestTeam["Name"];
}
//console.log(EnCokGolAtan(fifaData));

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(baseData) {

	const finalMaches = Finaller(baseData);

	const homeNameGoals = finalMaches.map((team) => { return { "Name": team["Home Team Name"], "Goal": team["Away Team Goals"] }; });
	const awayNameGoals = finalMaches.map((team) => { return { "Name": team["Away Team Name"], "Goal": team["Home Team Goals"] }; });
	
	const nameGoals = [...homeNameGoals, ...awayNameGoals];

	const teamNames = Array.from(new Set(nameGoals.map((team) => { return team["Name"] })));
	const totalTeamGoals = [];

	for (let n = 0; n < teamNames.length; n++) {
		let goalCount = 0;

		for (let i = 0; i < nameGoals.length; i++) {

			if (teamNames[n] === nameGoals[i]["Name"]) {
				goalCount += nameGoals[i]["Goal"];
			}
		}

		totalTeamGoals.push({
			"Name": teamNames[n],
			"Goal": goalCount
		});
	}

	const worstTeam = totalTeamGoals.reduce((top, team) => { return team.Goal > top.Goal ? team : top; })

	return worstTeam["Name"];

}
console.log(EnKotuDefans(fifaData));

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
	console.log('Kodlar çalışıyor');
	return 'as';
}
sa();
module.exports = {
	sa,
	Finaller,
	Yillar,
	Kazananlar,
	YillaraGoreKazananlar,
	OrtalamaGolSayisi
}
