(function(countries) {
    var search = $("#search");
    var result = $("#result");
    var self = this;
    self.output = null;

    function updateResult() {
        var inputValue = search.val().toLowerCase();
        var query = [];
        for (var i = 0; i < countries.length; i++) {
            if (countries[i].toLowerCase().indexOf(inputValue) == 0) {
                query.push(countries[i]);
            }
            if (query.length == 4) {
                break;
            }
        }
        var output = "";
        if (query.length == 0) {
            output = "<div>No results</div>";
        } else {
            for (var j = 0; j < query.length; j++) {
                output += `<p class="country">${query[j]}</p>`;
            }
        }
        if (inputValue.length == 0) {
            output = null;
        }
        self.output = output;
        result.html(self.output);
    }

    search.on({
        input: updateResult,
        paste: updateResult,
        keyup: function(e) {
            var children = $(result.get(0).children);
            var hasHighlight = result.find("p.highlight").index();
            //  down
            if (e.keyCode == 40) {
                if (hasHighlight == -1) {
                    children.eq(0).addClass("highlight");
                }
                if (hasHighlight > -1 && hasHighlight < children.length - 1) {
                    children.eq(hasHighlight).removeClass("highlight");
                    children
                        .eq(hasHighlight)
                        .next()
                        .addClass("highlight");
                }
            }
            // up
            if (e.keyCode == 38) {
                if (hasHighlight == -1) {
                    children.eq(children.length - 1).addClass("highlight");
                }
                if (hasHighlight < children.length && hasHighlight > 0) {
                    children.eq(hasHighlight).removeClass("highlight");
                    children
                        .eq(hasHighlight)
                        .prev()
                        .addClass("highlight");
                }
            }
            if (e.keyCode == 13) {
                if (hasHighlight > -1) {
                    var val = children.eq(hasHighlight).html();
                    search.val(val);
                    self.output = val;
                    result.html(null);
                }
            }
        },
        blur: function() {
            result.html(null);
        },
        focus: function() {
            result.html(self.output);
        }
    });
    result.on({
        mouseover: function(e) {
            var target = $(e.target);
            if (target.get(0).nodeName === "P") {
                target.addClass("highlight");
            }
        },
        mouseout: function(e) {
            var target = $(e.target);
            if (target.get(0).nodeName === "P") {
                target.removeClass("highlight");
            }
        },
        mousedown: function(e) {
            var target = $(e.target);
            var val = target.html();
            if (target.hasClass("country")) {
                search.val(val);
                self.output = val;
                result.html(null);
            }
        }
    });
})([
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Angola",
    "Anguilla",
    "Antigua",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bonaire (Netherlands Antilles)",
    "Bosnia Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo, The Democratic Republic of",
    "Cook Islands",
    "Costa Rica",
    "Croatia",
    "Curacao (Netherlands Antilles)",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iraq",
    "Ireland (Republic of)",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kosrae Island",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia (FYROM)",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Moldova",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Ponape",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Rota",
    "Russia",
    "Rwanda",
    "Saba (Netherlands Antilles)",
    "Saipan",
    "Samoa",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St. Barthelemy",
    "St. Croix",
    "St. Eustatius (Netherlands Antilles)",
    "St. John",
    "St. Kitts and Nevis",
    "St. Lucia",
    "St. Maarten (Netherlands Antilles)",
    "St. Thomas",
    "St. Vincent and the Grenadines",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Tinian",
    "Togo",
    "Tonga",
    "Tortola",
    "Trinidad and Tobago",
    "Truk",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos",
    "Tuvalu",
    "US Virgin Islands",
    "Uganda",
    "Ukraine",
    "Union Island",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Virgin Gorda",
    "Wallis and Futuna",
    "Yap",
    "Yemen",
    "Zambia",
    "Zimbabwe"
]);
