$(function () {
    
    var today = new Date();
    var presentYear = today.getFullYear();
    var presentMonth = today.getMonth();
    presentMonth += 1;  // because getMonth() starts counting from 0 but users month input starts from 1
    var presentDay = today.getDate();

    function isDateValid(year, month, day) {
        const date = new Date(year, month, 0); // 0 in date constructor means last day of the month
        const lastDay = date.getDate();

        return (1 <= day && day <= lastDay);
    }

   function calculateAge(birthYear, birthMonth, birthDay) {

        var ageYear = presentYear - birthYear;
        var ageMonth = presentMonth - birthMonth;
        var ageDay = presentDay - birthDay;

        if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
            ageYear--;
            ageMonth += 12;
        }

        if (ageDay < 0) {
            var lastMonthDate = new Date(presentYear, presentMonth, 0);
            ageDay += lastMonthDate.getDate();
            ageMonth--;
        }

        return [ ageYear, ageMonth, ageDay ];
    }
    
    $('.calculate-button').on('click', function (event) {
        event.stopPropagation();

        var $firstLabel = $('label:first-of-type');
        var $dateInput = $('#date-input');
        var $secondLabel = $('label:nth-of-type(2)');
        var $monthInput = $('#month-input');
        var $thirdLabel = $('label:last-of-type');
        var $yearInput = $('#year-input');

        //Functions to add error classes
        function addDayErrorClass() {
           $firstLabel.addClass('error-red');
            $dateInput.addClass('error-red-border');
        };

        function addMonthErrorClass() {
            $secondLabel.addClass('error-red');
            $monthInput.addClass('error-red-border');
        };

        function addYearErrorClass() {
            $thirdLabel.addClass('error-red');
            $yearInput.addClass('error-red-border');
        };
        
        //clear existing error messages
        $('#errorField1').text('');
        $('#errorField2').text('');
        $('#errorField3').text('');
        $firstLabel.removeClass('error-red');
        $dateInput.removeClass('error-red-border');
        $secondLabel.removeClass('error-red');
        $monthInput.removeClass('error-red-border');
        $thirdLabel.removeClass('error-red');
        $yearInput.removeClass('error-red-border');

        var $birthDay = $dateInput.val();
        var $birthMonth = $monthInput.val();
        var $birthYear = $yearInput.val();

        //dealing with different kinds of errors that may happen during form entry
        if ($birthDay === '') {
            $('#errorField1').text('This field is required');
            addDayErrorClass();
            return;
        }

        if ($birthMonth === '') {
            $('#errorField2').text('This field is required');
            addMonthErrorClass();
            return;
        }

        if ($birthYear === '') {
            $('#errorField3').text('This field is required');
            addYearErrorClass();
            return;
        }

        if (!($birthDay >= 1 && $birthDay <= 31)) {
            $('#errorField1').text('Must be a valid day');
            addDayErrorClass();
            return;
        }
        if (!($birthMonth >= 1 && $birthMonth <= 12)) {
            $('#errorField2').text('Must be a valid month');
            addMonthErrorClass();
            return;
        }

        if (isNaN($birthYear)) {
            $('#errorField3').text('Must be a valid year');
            addYearErrorClass();
            return;
        }

        if ($birthYear > presentYear) {
            $('#errorField3').text('Must be in the past');
            addYearErrorClass();
            return;
        }
    
        if (($birthYear == presentYear) && ($birthMonth > presentMonth)) {
            $('#errorField2').text('Must be in the past');
            addMonthErrorClass();
            return;
        }
    
        if (($birthYear == presentYear) && ($birthMonth == presentMonth) && ($birthDay > presentDay)) {
            $('#errorField1').text('Must be in the past');
            addDayErrorClass();
            return;
        }
            
        if (!(isDateValid($birthYear, $birthMonth, $birthDay))) {
            $('#errorField1').text('Must be a valid date');
            addDayErrorClass();
            addMonthErrorClass();
            addYearErrorClass();
            return;
        }

        //reading the array of values returned from the calculateAge function 
        const result = calculateAge($birthYear, $birthMonth, $birthDay);
        const $ageYear = result[0];
        const $ageMonth = result[1];
        const $ageDay = result[2];

        //assigning the final age values using the countTo function from countTo jquery plugin
            $('#year-output').countTo({from: 0, to: $ageYear, speed: 1000});
            $('#month-output').countTo({from: 0, to: $ageMonth, speed: 1000});
            $('#date-output').countTo({from: 0, to: $ageDay, speed: 1000});
        
    });
})