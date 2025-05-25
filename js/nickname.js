// قواعد توليد الأسماء المستعارة وتخصيصها
class NicknameGenerator {
    constructor() {
        this.form = document.getElementById('nicknameForm');
        this.resultContainer = document.getElementById('result');
        this.historyContainer = document.getElementById('nicknameHistory');
        
        this.inputs = {
            name: document.getElementById('name'),
            birthMonth: document.getElementById('birthMonth'),
            favoriteColor: document.getElementById('favoriteColor'),
            favoriteFood: document.getElementById('favoriteFood'),
            hobby: document.getElementById('hobby'),
            favoriteAnimal: document.getElementById('favoriteAnimal'),
            personalityType: document.getElementById('personalityType')
        };

        this.nicknameHistory = JSON.parse(localStorage.getItem('nicknameHistory') || '[]');
        this.initializeEventListeners();
        this.updateHistoryDisplay();
    }

    // قواعد توليد الأسماء المستعارة
    nicknameRules = {
        food: {
            pizza: ['🍕 ملك البيتزا', '🍕 صائد البيتزا', '🍕 فنان المارجريتا', '🍕 عبقري العجين', '🍕 سيد الطعم الإيطالي'],
            burger: ['🍔 سلطان البرجر', '🍔 صانع البرجر الأسطوري', '🍔 ملك الشيز برجر', '🍔 أمير الساندويتش', '🍔 عبقري الصوص'],
            shawarma: ['🥙 أمير الشاورما', '🥙 سيد الشاورما', '🥙 نجم الشاورما', '🥙 ملك اللفائف', '🥙 عبقري التتبيلة'],
            sushi: ['🍱 نينجا السوشي', '🍱 ساموراي السوشي', '🍱 حكيم السوشي', '🍱 سيد الرول', '🍱 فنان النيجيري'],
            falafel: ['🧆 عبقري الفلافل', '🧆 فنان الفلافل', '🧆 سيد الطعمية', '🧆 ملك الحمص', '🧆 أمير البقوليات']
        },
        color: {
            red: ['❤️ الأحمر الشجاع', '❤️ فارس القرمزي', '❤️ نجم الياقوت', '❤️ حامل الشعلة', '❤️ قلب النار'],
            blue: ['💙 الأزرق الحكيم', '💙 أمير السماء', '💙 حارس المحيط', '💙 سيد الأمواج', '💙 نجم الفيروز'],
            green: ['💚 الأخضر الحكيم', '💚 حامي الغابة', '💚 صديق الطبيعة', '💚 سيد المروج', '💚 حارس الأشجار'],
            yellow: ['💛 شعاع الشمس', '💛 نجم الذهب', '💛 حامل النور', '💛 فارس الضياء', '💛 أمير الشروق'],
            purple: ['💜 الأرجواني الملكي', '💜 سيد الغموض', '💜 حكيم البنفسج', '💜 أمير الظلال', '💜 فارس الغسق']
        },
        animal: {
            cat: ['🐱 القط الذكي', '🐱 النمر الصغير', '🐱 الأسد الودود', '🐱 صائد الظلال', '🐱 حارس الليل'],
            dog: ['🐕 الكلب الوفي', '🐕 حارس الليل', '🐕 صديق الإنسان', '🐕 حامي الدار', '🐕 رفيق الدرب'],
            lion: ['🦁 ملك الغابة', '🦁 القلب الشجاع', '🦁 الأسد الذهبي', '🦁 سيد السافانا', '🦁 فخر الأسود'],
            dolphin: ['🐬 صديق البحر', '🐬 راقص الأمواج', '🐬 حكيم المحيط', '🐬 نجم البحار', '🐬 أمير الخليج'],
            penguin: ['🐧 سيد القطب', '🐧 راقص الجليد', '🐧 الطائر السعيد', '🐧 ملك الثلج', '🐧 فارس القطب']
        },
        hobby: {
            reading: ['📚 عاشق الكتب', '📚 حكيم المكتبة', '📚 صائد المعرفة', '📚 سيد الكلمات', '📚 فارس القراءة'],
            gaming: ['🎮 أسطورة الألعاب', '🎮 محارب الكونسول', '🎮 بطل المراحل', '🎮 صائد الجوائز', '🎮 ملك المنصات'],
            cooking: ['👨‍🍳 شيف المستقبل', '👨‍🍳 ساحر المطبخ', '👨‍🍳 ملك النكهات', '👨‍🍳 عبقري الطبخ', '👨‍🍳 فنان الطعام'],
            sports: ['⚽ نجم الملاعب', '⚽ فارس الرياضة', '⚽ بطل الميدان', '⚽ صقر الملعب', '⚽ أسطورة الكرة'],
            music: ['🎵 عازف الأحلام', '🎵 ملك النغم', '🎵 أمير الألحان', '🎵 صانع الموسيقى', '🎵 فنان الأنغام']
        },
        personality: {
            adventurous: ['🌟 مغامر الحياة', '🌟 صائد المغامرات', '🌟 فارس التحديات', '🌟 باحث الإثارة', '🌟 مستكشف العالم'],
            creative: ['🎨 مبدع العصر', '🎨 فنان الحياة', '🎨 صانع الجمال', '🎨 ملهم الإبداع', '🎨 عبقري الفن'],
            friendly: ['🤝 صديق الجميع', '🤝 ملك القلوب', '🤝 نجم الصداقة', '🤝 رفيق الدرب', '🤝 حامل البسمة'],
            mysterious: ['🌙 سيد الغموض', '🌙 حارس الأسرار', '🌙 فارس الظلال', '🌙 صائد الألغاز', '🌙 غامض الليل'],
            wise: ['🦉 حكيم الزمان', '🦉 عالم العصر', '🦉 فيلسوف الحياة', '🦉 نور المعرفة', '🦉 منارة الحكمة']
        }
    };

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // تحديث مباشر للنتائج عند تغيير أي حقل
        Object.values(this.inputs).forEach(input => {
            if (input) {
                input.addEventListener('change', () => this.generateNickname());
            }
        });
    }

    generateNickname() {
        try {
            const name = this.inputs.name.value.trim();
            if (!name) throw new Error('الرجاء إدخال اسمك');

            const namePrefix = this.getRandomPrefix(name);
            const traits = this.getTraits();
            const nickname = this.combineNickname(namePrefix, traits);
            
            this.displayResult(nickname);
            this.addToHistory(nickname);
            
            return nickname;
        } catch (error) {
            this.showError(error.message);
            return null;
        }
    }

    getRandomPrefix(name) {
        const prefixes = [
            `${name} ال`,
            `ال${name}`,
            name,
            `${name} أبو`,
            `${name} صاحب`,
            `${name} سيد`,
            `${name} ملك`,
            `${name} فارس`,
            `${name} نجم`,
            `${name} أمير`
        ];
        return this.getRandomItem(prefixes);
    }

    getTraits() {
        const traits = [];
        
        if (this.inputs.favoriteColor.value) {
            const colorTraits = this.nicknameRules.color[this.inputs.favoriteColor.value];
            if (colorTraits) traits.push(this.getRandomItem(colorTraits));
        }
        
        if (this.inputs.favoriteFood.value) {
            const foodTraits = this.nicknameRules.food[this.inputs.favoriteFood.value];
            if (foodTraits) traits.push(this.getRandomItem(foodTraits));
        }
        
        if (this.inputs.favoriteAnimal.value) {
            const animalTraits = this.nicknameRules.animal[this.inputs.favoriteAnimal.value];
            if (animalTraits) traits.push(this.getRandomItem(animalTraits));
        }
        
        if (this.inputs.hobby.value) {
            const hobbyTraits = this.nicknameRules.hobby[this.inputs.hobby.value];
            if (hobbyTraits) traits.push(this.getRandomItem(hobbyTraits));
        }
        
        if (this.inputs.personalityType.value) {
            const personalityTraits = this.nicknameRules.personality[this.inputs.personalityType.value];
            if (personalityTraits) traits.push(this.getRandomItem(personalityTraits));
        }

        return traits;
    }

    combineNickname(prefix, traits) {
        const randomTrait = this.getRandomItem(traits);
        return `${prefix} ${randomTrait}`;
    }

    displayResult(nickname) {
        this.resultContainer.innerHTML = `
            <div class="nickname-result">
                <h2 class="nickname-title">اسمك المستعار هو:</h2>
                <div class="nickname-display">
                    <span class="nickname-text">${nickname}</span>
                    <button class="btn btn-primary btn-sm copy-btn" onclick="navigator.clipboard.writeText('${nickname}')">
                        <i class="bi bi-clipboard"></i> نسخ
                    </button>
                </div>
                <button class="btn btn-outline-primary btn-sm regenerate-btn" onclick="this.generateNickname()">
                    <i class="bi bi-arrow-clockwise"></i> توليد اسم آخر
                </button>
            </div>
        `;
    }

    addToHistory(nickname) {
        const timestamp = new Date().toLocaleString('ar-EG');
        this.nicknameHistory.unshift({ nickname, timestamp });
        
        // الاحتفاظ بآخر 10 أسماء فقط
        if (this.nicknameHistory.length > 10) {
            this.nicknameHistory.pop();
        }
        
        localStorage.setItem('nicknameHistory', JSON.stringify(this.nicknameHistory));
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        if (!this.historyContainer) return;
        
        if (this.nicknameHistory.length === 0) {
            this.historyContainer.innerHTML = '<p class="text-muted">لم يتم توليد أي أسماء مستعارة بعد</p>';
            return;
        }

        const historyHTML = this.nicknameHistory.map(item => `
            <div class="history-item">
                <span class="nickname">${item.nickname}</span>
                <small class="text-muted">${item.timestamp}</small>
            </div>
        `).join('');

        this.historyContainer.innerHTML = `
            <h3>سجل الأسماء السابقة</h3>
            <div class="history-list">
                ${historyHTML}
            </div>
        `;
    }

    showError(message) {
        this.resultContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <i class="bi bi-exclamation-triangle-fill"></i>
                ${message}
            </div>
        `;
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    handleSubmit(e) {
        e.preventDefault();
        this.generateNickname();
    }
}

// تهيئة المولد عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new NicknameGenerator();
});
