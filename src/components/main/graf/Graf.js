import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectAllPoints, postPoint, selectPointsByR, selectR } from "../../../api/apiSlice";
import './Graf.css'
import graf from "./pic.svg";
import { css } from '@emotion/react';

function transformCoords(x, y, half_canvas_size, r) {
    var new_x = ((x - half_canvas_size) * ((r + (r * 0.705)) / half_canvas_size)).toFixed(5);
    var new_y = (((-1 * (y - half_canvas_size))) * ((r + (r * 0.705)) / half_canvas_size)).toFixed(5);
    return { x: new_x, y: new_y, r: r };
}

function inverseTransformCoords(x, y, half_canvas_size, r) {
    var new_x = Math.round((x / ((r + (r * 0.705)) / half_canvas_size)) + half_canvas_size);
    var new_y = Math.round(((-1 * y) / ((r + (r * 0.705)) / half_canvas_size)) + half_canvas_size);
    return { x: new_x, y: new_y };
}

function resizeCtxCanvas(ctx) {
    const { width, height } = ctx.canvas.getBoundingClientRect();
    ctx.canvas.width = width;
    ctx.canvas.height = height;
}

function redrawDots(ctx, points) {
    points.forEach((point) => {
        const { x: x0, y: y0 } = inverseTransformCoords(Number(point.x), Number(point.y), ctx.canvas.width / 2, Number(point.r));
        drawDot(ctx, x0, y0, point.hit === "Hit");
    })

}

function drawDot(ctx, x, y, isHit) {
    let circle = new Path2D();
    circle.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = isHit ? "#f5f5f5" : "#fa2c2c";
    ctx.fill(circle);
}

function removeDots(ctx) {
    ctx.save();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.restore();
}

export const Graf = (props) => {
    const canvasRef = useRef(null);
    const dispatch = useDispatch();
    //useEffect(() => { dispatch(selectAllPoints()); }, [dispatch]);
    //const points = useSelector(selectAllPoints);
    const points = useSelector(selectPointsByR);
    const r = useSelector(selectR);
    //console.log(points)

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        resizeCtxCanvas(ctx);
        redrawDots(ctx, points);

        window.addEventListener('resize', () => {
            resizeCtxCanvas(ctx);
            redrawDots(ctx, points);
        });

        //return () => {
         //   window.removeEventListener('resize', () => {
           //     console.log('resized');
           // });
        //};

    }, [dispatch, points]);

    const handleClick = async (e) => {
        console.log();
        if (r > 0) {
            const { x: x, y: y } = transformCoords(e.nativeEvent.offsetX, e.nativeEvent.offsetY, canvasRef.current.getContext('2d').canvas.width / 2, r);
            try {
                await dispatch(postPoint({x:x, y:y, r:r})).unwrap();
            } catch (err) {
                console.error('Failed to add point: ', err)
            }

        } 
        
        //console.log("x: " + x + " y: " + y);
    }

    return (
        <section>
        <div id="image-container">
            <canvas id="graf" ref={canvasRef} onClick={handleClick} ></canvas>

            <object type="image/svg+xml" data={graf} width="100%" height="100%">
                Your browser does not support svg
            </object>
            
        </div>
        </section>
    );
}