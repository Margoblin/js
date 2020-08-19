class Product {

    constructor(name, price, src1, src2, src3, count) {
        this.name = name
        this.price = price
        this.src1 = src1
        this.src2 = src2
        this.src3 = src3
        this.count = 1
    }

    getMainTemplate() {
        const {
            price,
            name
        } = this

        let prodBlock = document.createElement('div')
        prodBlock.classList.add('product-block')
        let mainBlock = document.querySelector('.main')
        mainBlock.appendChild(prodBlock)
        prodBlock.innerHTML = `<img src="${this.src1}" class="main-img"></img>
                                <img src="${this.src1}" class="prod-img"></img>
                                <img src="${this.src2}" class="prod-img"></img>
                                <img src="${this.src3}" class="prod-img"></img>
                                <span class="product-name">${this.name}</span>
                                <span class="product-price">Цена: ${this.price}</span>`
        prodBlock.appendChild(this.addButton())
        return prodBlock
    }

    addButton() {
        const addButton = document.createElement('button')
        addButton.innerText = 'Добавить в корзину'
        addButton.classList.add('add-button')

        addButton.addEventListener('click', () => {
            const basket = new Basket()
            basket.add(this)
            basket.render()
        })

        return addButton
    }

    getBasketTemplate() {
        const basketProduct = document.createElement('div')
        basketProduct.classList.add('basket-product')
        basketProduct.innerHTML = `<div class="basket-img-block"><img class = "basket-img" src = "${this.src1}"></div>
                                            <div class="basket-product-info">
                                                <span class="product-name">${this.name}</span>
                                                <span class="product-price">Цена:&nbsp${this.price}</span>
                                                <span>Количество: ${this.count}</span>
                                            </div> `
        basketProduct.appendChild(this.plusButton())
        basketProduct.appendChild(this.minusButton())
        return basketProduct
    }

    plusButton() {
        const btn = document.createElement('button')
        btn.classList.add('mini-button')
        btn.innerText = '+'

        btn.addEventListener('click', count => {
            const basket = new Basket()
            this.count++
            this.getBasketTemplate()
            basket.render()
        })
        return btn
    }

    minusButton() {
        const btn = document.createElement('button')
        btn.classList.add('mini-button')
        btn.innerText = '-'

        btn.addEventListener('click', count => {
            if (this.count > 1) {
                const basket = new Basket()
                this.count--
                basket.render()
            } else {
                const basket = new Basket()
                basket.remove(this)
                basket.render()
            }
        })
        return btn
    }
}

class List {
    products = []

    constructor(products = []) {
        this.products = products
    }

    findProduct(product) {
        return this.products.filter(item => item.name === product.name)[0]
    }

    add(product) {
        const exist = this.findProduct(product)
        if (exist) {
            product.count++
        } else {
            this.products.push(product)
        }
    }

    remove(product) {
        const index = this.products.indexOf(product)
        if (index > -1) {
            this.products.splice(index, 1);
        }
    }
}

class Basket extends List {
    constructor() {
        if (Basket._instance) {
            return Basket._instance
        } else {
            super()
            this.init()
            Basket._instance = this
        }
    }

    init() {
        const basketBlock = document.createElement('div')
        basketBlock.classList.add('basket-block-none')

        const basketList = document.createElement('div')
        basketList.classList.add('basket-list')
        basketBlock.appendChild(basketList)

        const basketButton = document.querySelector('.basket')
        basketButton.addEventListener('click', () => {
            basketBlock.classList.toggle('basket-block')
        })

        const placeToRender = document.querySelector('nav')

        if (placeToRender) {
            placeToRender.appendChild(basketBlock)
        }

        this.render()
    }

    render() {
        const placeToRender = document.querySelector('.basket-list')

        if (!this.products.length) {
            placeToRender.innerHTML = `<span class="basket-text">Здесь пока ничего нет!</span>`
        } else {
            placeToRender.innerHTML = `<span class="basket-text"> В корзине сейчас: </span>`
            this.products.forEach(item => {
                placeToRender.appendChild(item.getBasketTemplate())
            })
            const sumBlock = document.createElement('div')
            sumBlock.classList.add('sum-block')
            placeToRender.appendChild(sumBlock)
            sumBlock.innerHTML = `<span>Количество товаров в корзине: ${this.getCount()}</span>
                                <span>Сумма: ${this.getSum()}</span>`
            sumBlock.appendChild(this.getClearButton(this.products))
        }
    }

    getSum() {
        let result = this.products.reduce(function (sum, product) {
            return sum + (product.price * product.count)
        }, 0)
        return result
    }

    getCount() {
        let result = this.products.reduce(function (sum, product) {
            return sum + product.count
        }, 0)
        return result
    }

    getClearButton(products) {
        const clearbtn = document.createElement('button')
        clearbtn.classList.add('clear-button')
        clearbtn.innerText = 'Очистить корзину'

        clearbtn.addEventListener('click', products => {
            this.products.forEach(item => {
                item.count = 1
            })
            this.products.length = 0
            this.render()
        })
        return clearbtn
    }
}



class ProdList extends List {

    constructor() {
        super()
    }

    render() {
        const placeToRender = document.querySelector('.main')

        if (placeToRender) {
            this.products.forEach(item => {
                const prodBlock = item.getMainTemplate()
                placeToRender.appendChild(prodBlock)
            })
        }
    }
}


let prodList = new ProdList()
prodList.add(new Product('Юбка', 700, 'images/prod-images/prod1-img1.jpg', 'images/prod-images/prod1-img2.jpg', 'images/prod-images/prod1-img3.jpg'))
prodList.add(new Product('Брюки', 1200, 'images/prod-images/prod2-img1.jpg', 'images/prod-images/prod2-img2.jpg', 'images/prod-images/prod2-img3.jpg'))
prodList.add(new Product('Шляпа', 500, 'images/prod-images/prod3-img1.jpg', 'images/prod-images/prod3-img2.jpg', 'images/prod-images/prod3-img3.jpg'))
prodList.add(new Product('Рубашка', 1900, 'images/prod-images/prod4-img1.jpg', 'images/prod-images/prod4-img2.jpg', 'images/prod-images/prod4-img3.jpg'))
prodList.add(new Product('Платье', 2100, 'images/prod-images/prod5-img1.jpg', 'images/prod-images/prod5-img2.jpg', 'images/prod-images/prod5-img3.jpg'))
prodList.render()
const basket = new Basket()
