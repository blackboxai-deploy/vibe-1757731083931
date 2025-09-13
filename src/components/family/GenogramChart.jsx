import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useFamilyContext } from '../../contexts/FamilyContext';
import { getHealthColor, getHealthStatus } from '../../data/familyData';
import Card from '../common/Card';

const GenogramChart = () => {
  const svgRef = useRef();
  const { familyData, selectMember } = useFamilyContext();

  useEffect(() => {
    if (!familyData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 500;

    // Clear previous content
    svg.selectAll("*").remove();

    // Create tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const root = d3.hierarchy(familyData.relaciones);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    treeLayout(root);

    // Enlaces
    svg.selectAll('path.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkVertical()
        .x(d => d.x + 50)
        .y(d => d.y + 50)
      );

    // Nodos
    const node = svg.selectAll('g.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x + 50},${d.y + 50})`);

    // Draw different shapes based on member data
    node.each(function(d) {
      if (!d.data.id) return; // Skip root node

      const member = familyData.miembros.find(m => m.id === d.data.id);
      if (!member) return;

      const healthColor = getHealthColor(member);
      const nodeGroup = d3.select(this);

      // Draw different shapes based on gender
      if (member.genero === 'M') {
        // Men: square
        nodeGroup.append('rect')
          .attr('x', -15)
          .attr('y', -15)
          .attr('width', 30)
          .attr('height', 30)
          .attr('fill', healthColor)
          .attr('stroke', '#333')
          .attr('stroke-width', 1)
          .style('cursor', 'pointer')
          .on('click', () => {
            if (d.data.id) {
              selectMember(d.data.id);
            }
          })
          .on('mouseover', function(event) {
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(`
              <strong>${member.nombre}</strong><br>
              Edad: ${member.edad} años<br>
              Rol: ${member.rol}<br>
              Estado: ${getHealthStatus(member)}
            `)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 28) + "px");
          })
          .on('mouseout', function() {
            tooltip.transition().duration(500).style("opacity", 0);
          });
      } else {
        // Women: circle
        nodeGroup.append('circle')
          .attr('r', 15)
          .attr('fill', healthColor)
          .attr('stroke', '#333')
          .attr('stroke-width', 1)
          .style('cursor', 'pointer')
          .on('click', () => {
            if (d.data.id) {
              selectMember(d.data.id);
            }
          })
          .on('mouseover', function(event) {
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(`
              <strong>${member.nombre}</strong><br>
              Edad: ${member.edad} años<br>
              Rol: ${member.rol}<br>
              Estado: ${getHealthStatus(member)}
            `)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 28) + "px");
          })
          .on('mouseout', function() {
            tooltip.transition().duration(500).style("opacity", 0);
          });
      }
    });

    // Add text labels
    node.append('text')
      .attr('dy', 30)
      .attr('x', 0)
      .attr('text-anchor', 'middle')
      .text(d => {
        if (!d.data.id) return d.data.name; // For root node
        const member = familyData.miembros.find(m => m.id === d.data.id);
        return member ? member.nombre.split(' ')[0] : d.data.name;
      });

    // Cleanup tooltip on unmount
    return () => {
      d3.selectAll('.tooltip').remove();
    };
  }, [familyData, selectMember]);

  return (
    <Card className="genogram-container">
      <h6>
        <i className="fas fa-project-diagram me-2"></i>
        Genograma Familiar
      </h6>
      
      <div className="d-flex flex-wrap mb-3">
        <div className="legend-item me-3">
          <div className="legend-symbol bg-primary"></div>
          <span>Varón</span>
        </div>
        <div className="legend-item me-3">
          <div className="legend-symbol bg-danger rounded-circle"></div>
          <span>Mujer</span>
        </div>
        <div className="legend-item me-3">
          <div className="legend-symbol bg-success"></div>
          <span>Salud buena</span>
        </div>
        <div className="legend-item me-3">
          <div className="legend-symbol bg-warning"></div>
          <span>Salud moderada</span>
        </div>
        <div className="legend-item">
          <div className="legend-symbol bg-danger"></div>
          <span>Salud en riesgo</span>
        </div>
      </div>
      
      <svg
        ref={svgRef}
        width="100%"
        height="500"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid meet"
      />
    </Card>
  );
};

export default GenogramChart;