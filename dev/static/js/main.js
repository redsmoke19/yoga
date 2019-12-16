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
        }

        function arrowClickNextHandler() {
            teamSlider.next();
        }

        function arrowClickDisabledHandler() {
            if (!teamSlider.cells[teamSlider.selectedIndex - 1]) {
                prevButton.setAttribute('disabled', '');
                nextButton.removeAttribute('disabled');
            } else if (!teamSlider.cells[teamSlider.selectedIndex + 1]) {
                nextButton.setAttribute('disabled', '');
                prevButton.removeAttribute('disabled');
            } else {
                prevButton.removeAttribute('disabled');
                nextButton.removeAttribute('disabled');
            }
        }

        prevButton.addEventListener('click', arrowClickPrevHandler);
        nextButton.addEventListener('click', arrowClickNextHandler);
        teamSlider.on('select', arrowClickDisabledHandler);
    }

    function getReviewsSlider() {
        var reviewsList = document.querySelector('.js-reviews-list');
        var reviewsSlider = new Flickity(reviewsList, {
            pageDots: false,
            prevNextButtons: false,
        });
        var counter = document.querySelector('.js-reviews__total-slider');

        var prevButton = document.querySelector('.reviews__button--prev');
        var nextButton = document.querySelector('.reviews__button--next');

        function arrowClickPrevHandler() {
            reviewsSlider.previous();
        }

        function arrowClickNextHandler() {
            reviewsSlider.next();
        }

        function arrowClickDisabledHandler(index) {
            // console.log(index);
            if (!reviewsSlider.cells[reviewsSlider.selectedIndex - 1]) {
                prevButton.setAttribute('disabled', '');
                nextButton.removeAttribute('disabled');
            } else if (!reviewsSlider.cells[reviewsSlider.selectedIndex + 1]) {
                nextButton.setAttribute('disabled', '');
                prevButton.removeAttribute('disabled');
            } else {
                prevButton.removeAttribute('disabled');
                nextButton.removeAttribute('disabled');
            }
        }

        function getCurrentReview() {
            var cellNumber = reviewsSlider.selectedIndex + 1;
            counter.textContent = cellNumber + ' / ' + reviewsSlider.slides.length;
        }
        getCurrentReview()
        prevButton.addEventListener('click', arrowClickPrevHandler);
        nextButton.addEventListener('click', arrowClickNextHandler);
        reviewsSlider.on('select', arrowClickDisabledHandler);
        reviewsSlider.on('select', getCurrentReview);
    }

    function getLabelBlur() {
        var label = document.querySelectorAll('.lesson__label');
        var input = document.querySelectorAll('.lesson__input');
        var form = document.querySelector('.lesson__form');
        function labelBlurHandler(evt) {
            var target = evt.target;
            if (target.closest('.lesson__label') || target.closest('.lesson__input')) {
                for (var i = 0; i < label.length; i++) {
                    if (input[i].value.length === 0) {
                        label[i].style.transform = '';
                        label[i].style.fontSize = '';
                    } else {
                        label[i].style.transform = 'translateY(-15px)';
                        label[i].style.fontSize = '10px';
                    }
                }
            } else {
                return;
            }
        }
        form.addEventListener('input', labelBlurHandler);
        form.addEventListener('blur', labelBlurHandler);
    }

    tabMembership();
    getTeamSlider();
    getReviewsSlider();
    getLabelBlur();

});