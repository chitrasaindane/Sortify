// # Sorting Visualizer Component #

import React from 'react';
import './Sorting.css'; // # Importing Sorting CSS

// # Tuple Class
class Tuple {
    constructor(first, second, operation) {
        this.first = first;
        this.second = second;
        this.operation = operation;
    }
}

// # Sorting Visualizer Component
class SortingVisualizer extends React.Component {

    // # Constructor
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            sortingAlgorithm: '',
            size: '',
            speed: '',
            barColor: '',
            pointerColor: '',
            sortedColor: '',
            sort: false,
            randomize: false
        };
        this.sorted = false;
        this.width = 0;
        this.height = 0;
    }

    // # Component Did Mount
    componentDidMount() {
        this.width = window.screen.width;
        this.height = window.screen.height;
        let controllerData = this.props.controllerData;
        let temp = new Set()
        while (temp.size !== parseInt(controllerData['size'])) {
            temp.add(this.getRandomElement());
        }
        temp = Array.from(temp);
        this.setState({
            arr: temp,
            sortingAlgorithm: controllerData['sortingAlgorithm'],
            size: controllerData['size'],
            speed: controllerData['speed'],
            barColor: this.getColor(controllerData['barColor']),
            pointerColor: this.getColor(controllerData['pointerColor']),
            sortedColor: this.getColor(controllerData['sortedColor']),
            sort: controllerData['sort'],
            randomize: controllerData['randomize']
        })
    }

    // # Component Did Update
    componentDidUpdate(previousProps, previousState) {
        if (previousProps.controllerData !== this.props.controllerData) {
            let controllerData = this.props.controllerData;
            let cd = {};
            if (controllerData['sort'] === true) {
                cd = {
                    sortingAlgorithm: controllerData['sortingAlgorithm'],
                    size: controllerData['size'],
                    speed: controllerData['speed'],
                    barColor: this.getColor(controllerData['barColor']),
                    pointerColor: this.getColor(controllerData['pointerColor']),
                    sortedColor: this.getColor(controllerData['sortedColor']),
                    sort: controllerData['sort'],
                    randomize: controllerData['randomize']
                }
                switch (controllerData.sortingAlgorithm) {
                    case "Linear Sort":
                        this.setState(cd, function () {
                            this.linearSort()
                        });
                        break;

                    case "Insertion Sort":
                        this.setState(cd, function () {
                            this.insertionSort()
                        });
                        break;

                    case "Selection Sort":
                        this.setState(cd, function () {
                            this.selectionSort()
                        });
                        break;

                    case "Quick Sort":
                        this.setState(cd, function () {
                            this.quickSortUtil()
                        });
                        break;

                    case "Merge Sort":
                        this.setState(cd, function () {
                            this.mergeSortUtil()
                        });
                        break;

                    case "Heap Sort":
                        this.setState(cd, function () {
                            this.heapSort()
                        });
                        break;

                    case "Cocktail Sort":
                        this.setState(cd, function () {
                            this.cocktailSort()
                        });
                        break;

                    default:
                        this.setState(cd, function () {
                            this.bubbleSort()
                        })
                        break;
                }
            }
            else {
                let newState = {};
                let temp = new Set();
                if (parseInt(this.state['size']) !== parseInt(controllerData['size'])) {
                    newState['sortingAlgorithm'] = controllerData['sortingAlgorithm'];
                    newState['size'] = parseInt(controllerData['size']);
                    newState['speed'] = controllerData['speed'];
                    newState['barColor'] = this.getColor(controllerData['barColor']);
                    newState['pointerColor'] = this.getColor(controllerData['pointerColor']);
                    newState['sortedColor'] = this.getColor(controllerData['sortedColor']);
                    newState['randomize'] = controllerData['randomize'];
                    newState['sort'] = controllerData['sort'];
                    while (temp.size !== newState['size']) {
                        temp.add(this.getRandomElement());
                    }
                    temp = Array.from(temp);
                    newState['arr'] = temp;
                }
                else {
                    if (controllerData['randomize'] === true) {
                        newState['sortingAlgorithm'] = controllerData['sortingAlgorithm'];
                        newState['size'] = parseInt(controllerData['size']);
                        newState['speed'] = controllerData['speed'];
                        newState['barColor'] = this.getColor(controllerData['barColor']);
                        newState['pointerColor'] = this.getColor(controllerData['pointerColor']);
                        newState['sortedColor'] = this.getColor(controllerData['sortedColor']);
                        newState['randomize'] = controllerData['randomize'];
                        newState['sort'] = controllerData['sort'];
                        while (temp.size !== newState['size']) {
                            temp.add(this.getRandomElement());
                        }
                        temp = Array.from(temp);
                        newState['arr'] = temp;
                        let bars = document.getElementsByClassName('array-bar');
                        for (let e = 0; e < bars.length; e++) bars[e].style.backgroundColor = newState['barColor'];
                    }
                    else {
                        newState['sortingAlgorithm'] = controllerData['sortingAlgorithm'];
                        newState['size'] = parseInt(controllerData['size']);
                        newState['barColor'] = this.getColor(controllerData['barColor']);
                        newState['pointerColor'] = this.getColor(controllerData['pointerColor']);
                        newState['sortedColor'] = this.getColor(controllerData['sortedColor']);
                        newState['speed'] = controllerData['speed'];
                        newState['arr'] = this.state.arr;
                    }
                }
                this.setState(newState);
            }
        }
    }

    // # Bubble Sort
    async bubbleSort() {
        this.sorted = false;
        this.props.visualizerDataHandler(this.sorted);
        let bars = document.getElementsByClassName('array-bar')
        let n = bars.length;
        let e, f, eIndex, fIndex;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                bars[j].style.backgroundColor = this.state.pointerColor;
                bars[j + 1].style.backgroundColor = this.state.pointerColor;
                e = parseInt(bars[j].innerHTML);
                eIndex = j;
                f = parseInt(bars[j + 1].innerHTML);
                fIndex = j + 1;
                if (e > f) {
                    let gValue = bars[eIndex].innerHTML
                    let gWidth = bars[eIndex].style.width
                    bars[eIndex].innerHTML = bars[fIndex].innerHTML
                    bars[eIndex].style.width = bars[fIndex].style.width
                    bars[fIndex].innerHTML = gValue;
                    bars[fIndex].style.width = gWidth;
                    if (this.state.randomize === true) return;
                    await this.sleep(this.getSpeed(this.state.speed));
                    if (this.state.randomize === true) return;
                }
                bars[j].style.backgroundColor = this.state.barColor;
                bars[j + 1].style.backgroundColor = this.state.barColor;
            }
            bars[n - i - 1].style.backgroundColor = this.state.sortedColor;
        }
        bars[0].style.backgroundColor = this.state.sortedColor;
        this.sorted = true;
        this.props.visualizerDataHandler(this.sorted);
    }

    // # Cocktail Sort
    async cocktailSort() {
        this.sorted = false;
        this.props.visualizerDataHandler(this.sorted);
        let bars = document.getElementsByClassName('array-bar');
        let n = bars.length;
        let swapped = true;
        let start = 0;
        let end = n - 1;
        let gValue, gWidth;
        while (swapped) {
            swapped = false;
            for (let i = start; i < end; ++i) {
                if (parseInt(bars[i].innerHTML) > parseInt(bars[i + 1].innerHTML)) {
                    bars[i].style.backgroundColor = this.state.pointerColor;
                    bars[i + 1].style.backgroundColor = this.state.pointerColor;
                    if (this.state.randomize === true) return;
                    await this.sleep(this.getSpeed(this.state.speed));
                    if (this.state.randomize === true) return;
                    bars[i].style.backgroundColor = this.state.barColor;
                    bars[i + 1].style.backgroundColor = this.state.barColor;
                    gValue = parseInt(bars[i].innerHTML);
                    gWidth = bars[i].style.width;
                    bars[i].innerHTML = parseInt(bars[i + 1].innerHTML);
                    bars[i].style.width = bars[i + 1].style.width;
                    bars[i + 1].innerHTML = gValue;
                    bars[i + 1].style.width = gWidth;
                    swapped = true;
                }
            }
            if (!swapped) break;
            swapped = false;
            bars[end].style.backgroundColor = this.state.sortedColor;
            --end;
            for (let i = end - 1; i >= start; --i) {
                if (parseInt(bars[i].innerHTML) > parseInt(bars[i + 1].innerHTML)) {
                    bars[i].style.backgroundColor = this.state.pointerColor;
                    bars[i + 1].style.backgroundColor = this.state.pointerColor;
                    if (this.state.randomize === true) return;
                    await this.sleep(this.getSpeed(this.state.speed));
                    if (this.state.randomize === true) return;
                    bars[i].style.backgroundColor = this.state.barColor;
                    bars[i + 1].style.backgroundColor = this.state.barColor;
                    gValue = parseInt(bars[i].innerHTML);
                    gWidth = bars[i].style.width;
                    bars[i].innerHTML = parseInt(bars[i + 1].innerHTML);
                    bars[i].style.width = bars[i + 1].style.width;
                    bars[i + 1].innerHTML = gValue;
                    bars[i + 1].style.width = gWidth;
                    swapped = true;
                }
            }
            bars[start].style.backgroundColor = this.state.sortedColor;
            ++start;
        }
        let i = start;
        let j = end;
        while (i <= j) {
            bars[j].style.backgroundColor = this.state.sortedColor;
            bars[i].style.backgroundColor = this.state.sortedColor;
            i++;
            j--;
        }
        this.sorted = true;
        this.props.visualizerDataHandler(this.sorted);
    }

    // # Heap Sort
    async heapSort() {
        this.sorted = false;
        this.props.visualizerDataHandler(this.sorted);
        let arr = document.getElementsByClassName('array-bar')
        let temp, tempWidth;
        let leftIndex, rightIndex, x, y
        let end;
        // # Building Heap
        for (let e = 1; e < arr.length; e++) {
            let i = e;
            while (i > 0) {
                if (parseInt(arr[i].innerHTML) > parseInt(arr[Math.floor((i - 1) / 2)].innerHTML)) {
                    x = i
                    y = Math.floor((i - 1) / 2);
                    temp = arr[x].innerHTML;
                    tempWidth = arr[x].style.width;
                    arr[x].style.backgroundColor = this.state.pointerColor
                    arr[y].style.backgroundColor = this.state.pointerColor
                    arr[x].innerHTML = arr[y].innerHTML;
                    arr[x].style.width = arr[y].style.width;
                    arr[y].innerHTML = temp;
                    arr[y].style.width = tempWidth;
                    await this.sleep(this.getSpeed(this.state.speed));
                    arr[x].style.backgroundColor = this.state.barColor
                    arr[y].style.backgroundColor = this.state.barColor
                    i = y
                }
                else {
                    break;
                }
            }
            if (this.state.randomize === true) return;
            await this.sleep(this.getSpeed(this.state.speed));
            if (this.state.randomize === true) return;
        }
        // # Heapify
        for (let e = arr.length - 1; e > 0; e--) {
            arr[0].style.backgroundColor = this.state.pointerColor
            arr[e].style.backgroundColor = this.state.pointerColor
            temp = arr[0].innerHTML;
            tempWidth = arr[0].style.width;
            arr[0].innerHTML = arr[e].innerHTML;
            arr[0].style.width = arr[e].style.width;
            arr[e].innerHTML = temp;
            arr[e].style.width = tempWidth;
            await this.sleep(this.getSpeed(this.state.speed));
            arr[0].style.backgroundColor = this.state.barColor
            arr[e].style.backgroundColor = this.state.barColor
            end = e - 1;
            let i = 0;
            while (i <= end) {
                leftIndex = 2 * i + 1;
                if (leftIndex > end) break;
                rightIndex = 2 * i + 2;
                if (rightIndex > end) rightIndex = leftIndex;
                if (parseInt(arr[i].innerHTML) >= Math.max(parseInt(arr[leftIndex].innerHTML), parseInt(arr[rightIndex].innerHTML))) break;
                if (parseInt(arr[leftIndex].innerHTML) >= parseInt(arr[rightIndex].innerHTML)) {
                    x = i;
                    y = leftIndex;
                    arr[x].style.backgroundColor = this.state.pointerColor;
                    arr[y].style.backgroundColor = this.state.pointerColor;
                    temp = arr[x].innerHTML;
                    tempWidth = arr[x].style.width;
                    arr[x].innerHTML = arr[y].innerHTML;
                    arr[x].style.width = arr[y].style.width;
                    arr[y].innerHTML = temp;
                    arr[y].style.width = tempWidth;
                    await this.sleep(this.getSpeed(this.state.speed));
                    arr[x].style.backgroundColor = this.state.barColor;
                    arr[y].style.backgroundColor = this.state.barColor;
                    i = leftIndex;
                }
                else {
                    x = i;
                    y = rightIndex;
                    arr[x].style.backgroundColor = this.state.pointerColor;
                    arr[y].style.backgroundColor = this.state.pointerColor;
                    temp = arr[x].innerHTML;
                    tempWidth = arr[x].style.width;
                    arr[x].innerHTML = arr[y].innerHTML;
                    arr[x].style.width = arr[y].style.width;
                    arr[y].innerHTML = temp;
                    arr[y].style.width = tempWidth;
                    if (this.state.randomize === true) return;
                    await this.sleep(this.getSpeed(this.state.speed));
                    if (this.state.randomize === true) return;
                    arr[x].style.backgroundColor = this.state.barColor;
                    arr[y].style.backgroundColor = this.state.barColor;
                    i = rightIndex;
                }
            }
            if (this.state.randomize === true) return;
            await this.sleep(this.getSpeed(this.state.speed));
            if (this.state.randomize === true) return;
            arr[e].style.backgroundColor = this.state.sortedColor;
        }
        arr[0].style.backgroundColor = this.state.sortedColor;
        this.sorted = true;
        this.props.visualizerDataHandler(this.sorted);
    }

    // # Insertion Sort
    async insertionSort() {
        this.sorted = false;
        this.props.visualizerDataHandler(this.sorted);
        let bars = document.getElementsByClassName('array-bar')
        let n = bars.length;
        let p, g, gValue, gWidth, jValue, jWidth;
        for (let i = 1; i <= n - 1; i++) {
            p = i;
            bars[i].style.backgroundColor = this.state.pointerColor;
            gValue = parseInt(bars[p].innerHTML);
            gWidth = bars[p].style.width;
            for (let j = p - 1; j >= 0; j--, p--) {
                jValue = parseInt(bars[j].innerHTML);
                jWidth = bars[j].style.width;
                g = j;
                bars[g].style.backgroundColor = this.state.pointerColor;
                if (gValue >= jValue) {
                    if (this.state.randomize === true) return;
                    await this.sleep(this.getSpeed(this.state.speed));
                    if (this.state.randomize === true) return;
                    bars[g].style.backgroundColor = this.state.sortedColor;
                    break;
                }
                bars[j + 1].innerHTML = jValue;
                bars[j + 1].style.width = jWidth;
                if (this.state.randomize === true) return;
                await this.sleep(this.getSpeed(this.state.speed));
                if (this.state.randomize === true) return;
                bars[g].style.backgroundColor = this.state.sortedColor;
            }
            bars[i].style.backgroundColor = this.state.sortedColor;
            bars[p].innerHTML = gValue;
            bars[p].style.width = gWidth;
        }
        this.sorted = true;
        this.props.visualizerDataHandler(this.sorted);
    }

    // # Linear Sort
    async linearSort() {
        this.sorted = false;
        this.props.visualizerDataHandler(this.sorted);
        let bars = document.getElementsByClassName('array-bar');
        let n = bars.length;
        let i, j, gValue, gWidth;
        i = 0;
        while (i <= n - 2) {
            j = i + 1;
            while (j <= n - 1) {
                bars[i].style.backgroundColor = this.state.pointerColor;
                bars[j].style.backgroundColor = this.state.pointerColor;
                if (parseInt(bars[j].innerHTML) < parseInt(bars[i].innerHTML)) {
                    bars[i].style.backgroundColor = this.state.pointerColor;
                    bars[j].style.backgroundColor = this.state.pointerColor;
                    if (this.state.randomize === true) return;
                    await this.sleep(this.getSpeed(this.state.speed));
                    if (this.state.randomize === true) return;
                    bars[i].style.backgroundColor = this.state.barColor;
                    bars[j].style.backgroundColor = this.state.barColor;
                    gValue = parseInt(bars[i].innerHTML);
                    gWidth = bars[i].style.width;
                    bars[i].innerHTML = parseInt(bars[j].innerHTML);
                    bars[i].style.width = bars[j].style.width;
                    bars[j].innerHTML = gValue;
                    bars[j].style.width = gWidth;
                }
                if (this.state.randomize === true) return;
                await this.sleep(this.getSpeed(this.state.speed));
                if (this.state.randomize === true) return;
                bars[j].style.backgroundColor = this.state.barColor;
                bars[i].style.backgroundColor = this.state.barColor;
                j++;
            }
            bars[i].style.backgroundColor = this.state.sortedColor;
            i++;
        }
        bars[n - 1].style.backgroundColor = this.state.sortedColor;
        this.sorted = true;
        this.props.visualizerDataHandler(this.sorted);
    }

    // # Merge Sort
    async mergeSortUtil() {
        this.sorted = false;
        this.props.visualizerDataHandler(this.sorted);
        let graphics = [];
        let arr = this.state.arr.slice();
        let low = 0;
        let high = arr.length - 1;
        this.mergeSort(arr, low, high, graphics)
        let bars = document.getElementsByClassName('array-bar')
        for (let i = 0; i < graphics.length; i++) {
            if (graphics[i].operation === 'add') {
                bars[graphics[i].first].style.backgroundColor = this.state.pointerColor;
                bars[graphics[i].second].style.backgroundColor = this.state.pointerColor;
            }
            if (graphics[i].operation === 'remove') {
                bars[graphics[i].first].style.backgroundColor = this.state.barColor;
                bars[graphics[i].second].style.backgroundColor = this.state.barColor;
            }
            if (graphics[i].operation === 'swap') {
                bars[graphics[i].first].innerHTML = graphics[i].second;
                bars[graphics[i].first].style.width = graphics[i].second + 'px';
                bars[graphics[i].first].style.backgroundColor = this.state.sortedColor;
            }
            if (this.state.randomize === true) return;
            await this.sleep(this.getSpeed(this.state.speed));
            if (this.state.randomize === true) return;
        }
        this.sorted = true;
        this.props.visualizerDataHandler(this.sorted);
    }

    // # Sort
    mergeSort(arr, low, high, graphics) {
        if (low >= high) return;
        var middle = Math.floor((low + high) / 2);
        this.mergeSort(arr, low, middle, graphics);
        this.mergeSort(arr, middle + 1, high, graphics);
        this.merge(arr, low, high, graphics);
    }

    // # Merge
    merge(arr, low, high, graphics) {
        let middle = Math.floor((low + high) / 2);
        let temp = new Array(high - low + 1);
        let i = low;
        let j = middle + 1;
        let r = 0;
        while (i <= middle && j <= high) {
            graphics.push(new Tuple(i, j, 'add'))
            graphics.push(new Tuple(i, j, 'remove'))
            if (arr[i] <= arr[j]) {
                temp[r] = arr[i]
                r++;
                i++;
            }
            else {
                temp[r] = arr[j];
                r++
                j++
            }
        }
        while (i <= middle) {
            graphics.push(new Tuple(i, i, 'add'))
            graphics.push(new Tuple(i, i, 'remove'))
            temp[r] = arr[i];
            r++;
            i++;
        }
        while (j <= high) {
            graphics.push(new Tuple(j, j, 'add'))
            graphics.push(new Tuple(j, j, 'remove'))
            temp[r] = arr[j];
            r++;
            j++;
        }
        i = low;
        for (let k = 0; k < temp.length;) {
            graphics.push(new Tuple(i, temp[k], 'swap'))
            arr[i] = temp[k];
            i++;
            k++;
        }
    }

    // # Quick Sort
    async quickSortUtil() {
        this.sorted = false;
        this.props.visualizerDataHandler(this.sorted);
        let arr = this.state.arr.slice();
        let low = 0;
        let high = arr.length - 1;
        let graphics = [];
        let gValue, gWidth;
        let sorted = this.state.arr.slice().sort(function (a, b) {
            return a - b;
        });
        this.quickSort(arr, low, high, graphics, sorted)
        let bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < graphics.length; i++) {
            if (graphics[i].operation === 'add') {
                bars[graphics[i].first].style.backgroundColor = this.state.pointerColor;
                bars[graphics[i].second].style.backgroundColor = this.state.pointerColor
                if (this.state.randomize === true) return;
                await this.sleep(this.getSpeed(this.state.speed) / 2);
                if (this.state.randomize === true) return;
            }
            if (graphics[i].operation === 'fix') {
                bars[graphics[i].first].style.backgroundColor = this.state.sortedColor;
                bars[graphics[i].second].style.backgroundColor = this.state.sortedColor;
            }
            if (graphics[i].operation === 'remove') {
                bars[graphics[i].first].style.backgroundColor = this.state.barColor;
                bars[graphics[i].first].style.backgroundColor = this.state.barColor;
            }
            if (graphics[i].operation === 'swap') {
                if (this.state.randomize === true) return;
                await this.sleep(this.getSpeed(this.state.speed) / 2);
                if (this.state.randomize === true) return;
                gValue = bars[graphics[i].first].innerHTML;
                gWidth = bars[graphics[i].first].style.width;
                bars[graphics[i].first].innerHTML = bars[graphics[i].second].innerHTML;
                bars[graphics[i].first].style.width = bars[graphics[i].second].style.width;
                bars[graphics[i].second].innerHTML = gValue;
                bars[graphics[i].second].style.width = gWidth;
                if (this.state.randomize === true) return;
                await this.sleep(this.getSpeed(this.state.speed) / 2);
                if (this.state.randomize === true) return;
            }
        }
        this.sorted = true;
        this.props.visualizerDataHandler(this.sorted);
    }

    // # Sort
    quickSort(arr, low, high, graphics, sorted) {
        if (low < high) {
            let pi = this.partition(arr, low, high, graphics, sorted);
            this.quickSort(arr, low, pi - 1, graphics, sorted);
            this.quickSort(arr, pi + 1, high, graphics, sorted);
        }
    }

    // # Partition
    partition(arr, low, high, graphics, sorted) {
        let g;
        let pivot = arr[high];
        let i = low - 1;
        graphics.push(new Tuple(high, high, 'add'));
        for (let j = low; j <= high - 1; j++) {
            graphics.push(new Tuple(j, j, 'add'));
            if (arr[j] < pivot) {
                i++;
                g = arr[i];
                arr[i] = arr[j];
                arr[j] = g;
                graphics.push(new Tuple(i, j, 'add'));
                graphics.push(new Tuple(i, j, 'remove'));
                graphics.push(new Tuple(i, j, 'swap'));
            }
            graphics.push(new Tuple(j, j, 'remove'));
        }
        g = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = g;
        graphics.push(new Tuple(i + 1, high, 'add'));
        graphics.push(new Tuple(i + 1, high, 'remove'));
        graphics.push(new Tuple(i + 1, high, 'swap'));
        graphics.push(new Tuple(high, high, 'remove'));
        for (let k = 0; k < arr.length; k++) {
            if (arr[k] === sorted[k]) {
                graphics.push(new Tuple(k, k, 'fix'));
            }
        }
        graphics.push(new Tuple(i + 1, i + 1, 'fix'));
        return i + 1;
    }

    // # Selection Sort
    async selectionSort() {
        this.sorted = false;
        this.props.visualizerDataHandler(this.sorted);
        let bars = document.getElementsByClassName('array-bar')
        let n = bars.length;
        let m, r, gValue, gWidth;
        for (let i = 0; i < n - 1; i++) {
            m = i;
            for (let j = i + 1; j < n; j++) {
                r = m;
                bars[r].style.backgroundColor = this.state.pointerColor
                bars[j].style.backgroundColor = this.state.pointerColor
                if (parseInt(bars[j].innerHTML) < parseInt(bars[m].innerHTML)) {
                    m = j;
                }
                if (this.state.randomize === true) return;
                await this.sleep(this.getSpeed(this.state.speed));
                if (this.state.randomize === true) return;
                bars[r].style.backgroundColor = this.state.barColor
                bars[j].style.backgroundColor = this.state.barColor
            }
            bars[i].style.backgroundColor = this.state.sortedColor
            gWidth = bars[i].style.width;
            gValue = parseInt(bars[i].innerHTML);
            bars[i].innerHTML = parseInt(bars[m].innerHTML);
            bars[i].style.width = bars[m].style.width;
            bars[m].innerHTML = gValue;
            bars[m].style.width = gWidth;
        }
        bars[n - 1].style.backgroundColor = this.state.sortedColor;
        this.sorted = true;
        this.props.visualizerDataHandler(this.sorted);
    }

    // # Sleep
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // # Get Speed
    getSpeed(speed) {
        switch (speed) {
            case 'Very Fast':
                return 25;
            case 'Normal':
                return 250;
            case 'Slow':
                return 500;
            case 'Very Slow':
                return 1000;
            default:
                return 100;
        }
    }

    // # Get Color
    getColor(barColor) {
        switch (barColor) {
            case 'Blue':
                return '#3730a3'
            case 'Cyan':
                return '#0891b2'
            case 'Green':
                return '#16a34a'
            case 'Pink':
                return '#db2777'
            case 'Red':
                return '#e11d48'
            case 'Yellow':
                return '#eab308'
            default:
                return '#1f2937'
        }
    }

    // # Get Subtract Factor
    getSubtractFactor() {
        const size = parseInt(this.state.size);  // # Array Size
        let factor = 4; // # Subtract Factor 
        // # Subtract Factor Calculation
        if (size == 10) {
            factor += 18;
        } else if (size == 15) {
            factor += 12;
        } else if (size == 20) {
            factor += 8;
        } else if (size == 25) {
            factor += 6;
        } else if (size == 30) {
            factor += 4;
        } else if (size == 35) {
            factor += 2;
        } else if (size == 40) {
            factor += 1;
        } else {
            factor += 0;
        }
        // # Return Factor
        return factor;
    }

    // # Get Bar Height
    getBarHeight() {
        const size = parseInt(this.state.size); // # Array Size
        let height = ((this.height - 150) - (size * 5)) / size;
        return height;
    }

    // # Get Font Height
    getFontHeight() {
        const size = parseInt(this.state.size); // # Array Size
        let fontHeight = ((this.height - 150) - (size * 5)) / size;
        const factor = this.getSubtractFactor();
        return (fontHeight - factor);
    }

    // # Get Random Element
    getRandomElement() {
        var max = 0;
        var min = 50;
        if (this.width < 768) max = (this.width * 8) / 10;
        else max = (this.width * 6) / 10
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // # Render
    render() {
        return (
            <div id='barView'>
                {
                    this.state.arr.map((value, idx) => (
                        <div className="array-bar" key={idx} style={
                            {
                                width: `${value + 10}px`,
                                backgroundColor: `${this.state.barColor}`,
                                height: `${this.getBarHeight()}px`,
                                fontSize: `${this.getFontHeight()}px`
                            }
                        }>
                            {value}
                        </div>
                    )
                    )
                }
                <br />
            </div>
        )
    }
}

// # Exporting Sorting Visualizer Component
export default SortingVisualizer;