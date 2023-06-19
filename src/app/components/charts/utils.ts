export function textInCenter(chart:any, value:any) {
  var ctx = chart.ctx;
  // ctx.clearRect(0, 0, tooltipCanvas.width, tooltipCanvas.height);
	ctx.restore();

  // Draw value
  if (sessionStorage.getItem('theme') === 'theme-light') {
    ctx.fillStyle = '#333333';
  }
  if (sessionStorage.getItem('theme') === 'theme-dark') {
    ctx.fillStyle = '#fbfbfd';
  }
  ctx.font = '18px sans-serif';
  ctx.textBaseline = 'middle';

  var lineHeight = 10;

  // Define text position
  var textPosition = {
    x: Math.round(chart.width / 2 - (ctx.measureText(value).width / 2)),
    y: chart.height / 2,
  };

  ctx.fillText(value, textPosition.x, textPosition.y );
  ctx.save();
}




export function textInCenterWithLineBreak(chart:any) {
  var ctx = chart.ctx;
  // ctx.clearRect(0, 0, tooltipCanvas.width, tooltipCanvas.height);
	ctx.restore();

  // Draw value
  if (sessionStorage.getItem('theme') === 'theme-light') {
    ctx.fillStyle = '#333333';
  }
  if (sessionStorage.getItem('theme') === 'theme-dark') {
    ctx.fillStyle = '#fbfbfd';
  }
  ctx.font = '22px sans-serif';
  ctx.textBaseline = 'middle';
  ctx.textAlign = "center";

  // jak zrobić tekst w 2 liniach ?
  var lineHeight = 30;
  let value = chart.data.labels;

  // Define text position
  var textPosition = {
    x: Math.round(chart.width / 2 ),
    y: chart.height / 2 - (lineHeight / 2),
  };


  for(let i = 0;i<value.length;i++) {
    ctx.fillText(value[i], textPosition.x, textPosition.y + (i*lineHeight));
  }


  ctx.save();
}
