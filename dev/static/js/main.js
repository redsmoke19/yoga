$(document).ready(function () {
    svg4everybody({});

    function tabMembership() {
        let tabButton = document.querySelectorAll('.month-list__button');
        let tabContent = document.querySelectorAll('.membership');
        let tabName;
        for (let i = 0; i < tabButton.length; i++) {
            tabButton[i].addEventListener('click', selectTabButton)
        }

        function selectTabButton() {
            for (let i = 0; i < tabButton.length; i++) {
                tabButton[i].classList.remove('month-list__button--active');
            }
            this.classList.add('month-list__button--active');
            tabName = this.getAttribute('data-tab-name');
            selectTabContent(tabName);
        }

        function selectTabContent(tabName) {
            for (let i = 0; i < tabContent.length; i++) {
                tabContent[i].classList.contains(tabName) ? tabContent[i].classList.add('membership--active') : tabContent[i].classList.remove('membership--active');
            }
        }
    }

    function getTeamSlider() {
        var teamList = document.querySelector('.js-team-list');
        var teamSlider = new Flickity(teamList, {
            pageDots: false,
            prevNextButtons: false,
        });
        var prevButton = document.querySelector('.team-list__button--prev');
        var nextButton = document.querySelector('.team-list__button--next');

        function arrowClickPrevHandler() {
            teamSlider.previous();
            arrowClickDisabledHandler();
        }
        function arrowClickNextHandler() {
            teamSlider.next();
            arrowClickDisabledHandler();
        }
        function arrowClickDisabledHandler() {
            if (!teamSlider.cells[teamSlider.selectedIndex - 1]) {
                prevButton.setAttribute('disabled', 'disabled');
                nextButton.removeAttribute('disabled');
            } else if (!teamSlider.cells[teamSlider.selectedIndex + 1]) {
                nextButton.setAttribute('disabled', 'disabled');
                prevButton.removeAttribute('disabled');
            } else {
                prevButton.removeAttribute('disabled');
                nextButton.removeAttribute('disabled');
            }
        }

        prevButton.addEventListener('click', arrowClickPrevHandler);
        nextButton.addEventListener('click', arrowClickNextHandler);

    }

    tabMembership();
    getTeamSlider();
});