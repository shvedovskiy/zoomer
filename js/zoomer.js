(function () {
    class Zoomer {
        constructor(images) {
            if (!Zoomer.markupAlreadyCreated) {
                Zoomer.setMarkup();
            }

            this.ESC_KEY_CODE = 27;
            this.$largeImg = document.getElementById('large-img');
            this.$largeImgContainer = document.querySelector('.large-outer-img-container');
            this.$blur = document.querySelector('.blur');

            document.querySelector(images).addEventListener('click', this);
            this.$largeImgContainer.addEventListener('click', this);
            window.addEventListener('resize', this);
            window.addEventListener('keydown', this);
        }

        handleEvent(event) {
            switch (event.type) {
                case 'click':
                    if (event.target.closest('img')) {
                        this.zoomImage(event);
                    } else if (event.target.closest('.large-outer-img-container')) {
                        this.closeLargeImage();
                    }
                    break;
                case 'resize':
                    this.setMaxImageSize();
                    break;
                case 'keydown':
                    this.closeByEsc(event);
                    break;
            }
        }

        zoomImage(event) {
            let pathToLargeImage = event.target
                .getAttribute('src')
                .replace(/small/, 'large');

            this.$largeImg.setAttribute('src', pathToLargeImage);
            this.$largeImgContainer.style.display = 'block';
            this.$blur.style.display = 'block';

            this.setMaxImageSize();
        }

        closeByEsc(event) {
            if (event.keyCode === this.ESC_KEY_CODE) {
                this.closeLargeImage();
            }
        }

        closeLargeImage() {
            this.$largeImgContainer.style.display = 'none';
            this.$blur.style.display = 'none';
        }

        setMaxImageSize() {
            this.$largeImg.style.maxHeight = getComputedStyle(this.$largeImgContainer).height;
            this.$largeImg.style.maxWidth = parseFloat(
                getComputedStyle(this.$largeImgContainer).width
            ) - 1 + 'px';
        }

        static setMarkup() {
            /*
            <div class="blur"></div>
            <div class="large-outer-img-container">
                <div class="large-inner-img-container">
                    <img src="" alt="" id="large-img">
                    <div class="close-btn">
                </div>
            </div>
            */
            let $blur              = document.createElement('div'),
                $outerImgContainer = document.createElement('div'),
                $innerImgContainer = document.createElement('div'),
                $largeImg          = document.createElement('img'),
                $closeBtn          = document.createElement('div');

            $outerImgContainer.className = 'large-outer-img-container';
            $innerImgContainer.className = 'large-inner-img-container';
            $blur.className = 'blur';
            $largeImg.id = 'large-img';
            $largeImg.alt = $largeImg.src = '';
            $closeBtn.className = 'close-btn';

            document.body.appendChild($blur);
            document.body.appendChild($outerImgContainer);

            $innerImgContainer.appendChild($largeImg);
            $innerImgContainer.appendChild($closeBtn);
            $outerImgContainer.appendChild($innerImgContainer);

            Zoomer.markupAlreadyCreated = true;
        }
    }

    window.picSet = new Zoomer('.gallery-1');
}());
