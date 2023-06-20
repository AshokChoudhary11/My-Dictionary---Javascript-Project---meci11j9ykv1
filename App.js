let showingHistory = false;
const historyButton = document.getElementById('redirect')


const handleHistoryClick = () => {
    if (showingHistory) {
        document.getElementById('redirect').innerText = 'History';
        document.getElementById('search-form-body').style.display = 'flex';
        document.getElementById('history-form-body').style.display = 'none';
        showingHistory = false;
    } else {
        document.getElementById('redirect').innerText = 'Search';
        document.getElementById('search-form-body').style.display = 'none';
        document.getElementById('history-form-body').style.display = 'flex';
        let oldValue = localStorage.getItem('search-word-experiment')
        if (oldValue) {
            oldValue = JSON.parse(oldValue)
        }
        document.getElementById('history-form-body').innerHTML = '';
        oldValue.forEach((oldSearch) => {
            document.getElementById('history-form-body').innerHTML +=
                `<div class="history-card">

        <div class="history-card-heading">word: ${oldSearch.word}
        </div>
        <div class="history-card-sub-heading">
            ${JSON.stringify(oldSearch.meaning)}
        </div>
       </div>`
        })

        showingHistory = true;
    }
}
const searchWordHandler = () => {
    const searchWord = document.getElementById('search-word-input').value
    if (searchWord) {
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + searchWord)
            .then(response => response.json())
            .then(jsonReponse => {
                let oldValue = localStorage.getItem('search-word-experiment')

                if (oldValue) {
                    oldValue = JSON.parse(oldValue)
                } else {
                    oldValue = []
                }

                oldValue.push({
                    word: searchWord,
                    meaning: jsonReponse,
                })
                localStorage.setItem('search-word-experiment', JSON.stringify(oldValue))
                const resultDiv = document.getElementById('result')
                if (Array.isArray(jsonReponse)) {
                    resultDiv.innerHTML = `<div class="history-card">
                                                            <div class="history-card-heading">word: ${searchWord}
                                                            </div>
                                                            <div class="history-card-sub-heading">
                                                                ${JSON.stringify(jsonReponse[0].meanings)}
                                                            </div>      
                                                        </div>`
                } else {

                    resultDiv.innerHTML = "unknown word"
                }

            }).catch((e) => {
                console.error(e)
            })

    }

}
