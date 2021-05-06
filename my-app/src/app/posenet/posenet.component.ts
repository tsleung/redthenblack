import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posenet',
  templateUrl: './posenet.component.html',
  styleUrls: ['./posenet.component.scss']
})
export class PosenetComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    this.doStuff();
  }
  async doStuff() {

    var flipHorizontal = false;
    
    var imageElement = document.getElementById('cat');
    console.log('posenet')
    const posenet = window['posenet'];
    posenet.load().then(function(net){
    return net.estimateMultiplePoses(imageElement, {
    flipHorizontal: false,
    maxDetections: 2,
    scoreThreshold: 0.6,
    nmsRadius: 20})
    }).then(function(poses){
        console.log('poses')
    console.log(poses);
    });


let bodyPix = window['bodyPix'] as any;
var img = document.getElementById('cat');

const net = await bodyPix.load();
const segmentation = await net.segmentPerson(img);
const opacity = 0.7;
const maskBlurAmount = 0;
const pixelCellWidth = 10.0;

// The mask image is an binary mask image with a 1 where there is a person and
// a 0 where there is not.

const canvas = document.getElementById('canvas');
const partSegmentation = await net.segmentMultiPersonParts(img);

console.log('segmentation',segmentation)
console.log('partSegmentation',partSegmentation)
bodyPix.drawMask(
  canvas, img, bodyPix.toMask(segmentation), opacity, maskBlurAmount,
  flipHorizontal);

const canvas2 = document.getElementById('canvas2');
(window['bodyPix'] as any).drawMask(
    canvas2, img, bodyPix.toMask(segmentation), opacity, maskBlurAmount,
    flipHorizontal);


const canvas3 = document.getElementById('canvas3');
(window['bodyPix'] as any).drawMask(
    canvas3, img, bodyPix.toColoredPartMask(segmentation), opacity, maskBlurAmount,
    flipHorizontal);

    const canvas4 = document.getElementById('canvas4');
    (window['bodyPix'] as any).drawPixelatedMask(
        canvas4, img, bodyPix.toColoredPartMask(segmentation));

        const canvas5 = document.getElementById('canvas5');
(window['bodyPix'] as any).drawPixelatedMask(
    canvas5, img, bodyPix.toColoredPartMask(segmentation), opacity, maskBlurAmount,
    flipHorizontal, pixelCellWidth);

    const canvas6 = document.getElementById('canvas6');
(window['bodyPix'] as any).drawPixelatedMask(
    canvas6, img, bodyPix.toColoredPartMask(segmentation), opacity, maskBlurAmount,
    flipHorizontal, pixelCellWidth);




}
}
