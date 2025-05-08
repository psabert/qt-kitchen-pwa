const days = ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
const meals = ['Frühstück', 'Mittagessen', 'Abendessen'];
const recipes = {
    'Spaghetti': ['Nudeln', 'Tomatensauce'],
    'Suppe': ['Wasser', 'Gemüse'],
    'Pfannkuchen': ['Mehl', 'Eier', 'Milch']
};

$(function () {
    // Aufbau des Wochenplans
    days.forEach(day => {
        const dayDiv = $(`<div class='day'><h3>${day}</h3></div>`);
        meals.forEach(meal => {
            const select = $('<select class="meal-select"></select>').append(`<option value="">-- ${meal} --</option>`);
            for (let recipe in recipes) {
                select.append(`<option value="${recipe}">${recipe}</option>`);
            }
            dayDiv.append(select);
        });
        $('#meal-plan').append(dayDiv);
    });

    $('#generate-list').on('click', function () {
        const ingredients = {};
        $('.meal-select').each(function () {
            const selected = $(this).val();
            if (selected && recipes[selected]) {
                recipes[selected].forEach(ing => {
                    ingredients[ing] = (ingredients[ing] || 0) + 1;
                });
            }
        });

        const list = $('<ul></ul>');
        for (let ing in ingredients) {
            list.append(`<li>${ing}: ${ingredients[ing]}</li>`);
        }
        $('#shopping-list').html(list);
    });
});
