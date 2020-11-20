<template>
    <div style="width: 1000px;margin: 50px auto">
        <!--Canvas  纸飞机-->
        <canvas width="500" height="500" id="canvas"></canvas>
    </div>
</template>
<style>
    body {
        background: gray;
    }

    canvas {
        background: white;
    }
</style>
<script>

	export default {
		mounted() {

			class Arrow {
				constructor() {
					this.x = 0
					this.y = 0
					this.angle = 0
				}

				draw(context) {
					context.save()
					context.translate(this.x, this.y)
					context.rotate(this.angle)
					context.beginPath()
					context.moveTo(0, 0)
					context.lineTo(-40, 15)
					context.lineTo(-40, -15)
					context.closePath()
					context.fillStyle = 'yellow'
					context.fill()
					context.restore()
				}
			}

			var arrow = new Arrow()
			var initPos = {
				x: canvas.width / 2,
				y: canvas.height / 2
			}
			arrow.x = initPos.x
			arrow.y = initPos.y
            //suoyoudongxi have menthods xt zjj
			var context = canvas.getContext('2d')
			var mouse = captureMouse(initPos)
			var v = 2
			;(function drawFrame() {
				window.requestAnimationFrame(drawFrame)
				context.clearRect(0, 0, canvas.width, canvas.height)
				var dx = mouse.x - arrow.x
				var dy = mouse.y - arrow.y
				var angle = Math.atan2(dy, dx)
				var vx
				var vy
				if (dx * dx + dy * dy < v * v) {
					vx = 0
					vy = 0
				} else {
					vx = Math.cos(angle) * v
					vy = Math.sin(angle) * v
				}

				arrow.x += vx
				arrow.y += vy
				arrow.angle = angle
				arrow.draw(context)
			})();

			function captureMouse(mouse = {x: 0, y: 0}) {
				canvas.addEventListener('mousemove', event => {
					mouse.x = event.pageX - canvas.offsetLeft
					mouse.y = event.pageY - canvas.offsetTop
				})
				return mouse
			}
		},
	}
</script>
